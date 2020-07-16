import firestore from '@react-native-firebase/firestore';
import {
  LocationData,
  LocationStore,
  GameSettingsStore,
  GameDataStore,
  FetchLocation,
  BADGES,
  Challenge,
  QuestionData,
} from 'api';
import { Button, Template, TipCarousel, Scoreboard, LocalScoreboard, FakeScoreboards } from 'components';
import { i18n } from 'locale';
import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react';
import { StyleSheet, View, Alert, AsyncStorage, AppState, FlatList } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { LocationManager, NotificationService, logEvent } from 'services';

interface Props extends NavigationInjectedProps {
  rootStore: {
    location: LocationStore;
    gameSettings: GameSettingsStore;
    gameData: GameDataStore;
  };
}

interface State {
  loading: boolean;
}

class HomeScreen extends PureComponent<Props, State> {
  state = {
    loading: false,
  };

  updateLocation = async (): Promise<{ status: FetchLocation }> => {
    try {
      const address = (await LocationManager.getCurrentLocation()) as LocationData;
      this.storeNewAddress(address);
      return {
        status: 'success',
      };
    } catch (error) {
      Alert.alert('Error', error.message);
      return {
        status: 'failure',
      };
    }
  };

  storeNewAddress = (address: LocationData) => {
    const { location, gameSettings } = this.props.rootStore;
    const currentLocationData = {
      countryRegion: location.countryRegion,
      adminDistrict: location.adminDistrict,
      adminDistrict2: location.adminDistrict2,
    };
    const newLocationData = {
      countryRegion: address.countryRegion,
      adminDistrict: address.adminDistrict,
      adminDistrict2: address.adminDistrict2,
    };
    logEvent('newLocation', newLocationData);
    this.props.rootStore.location.setLocationData(newLocationData);

    if (
      AppState.currentState.match(/inactive|background/) &&
      currentLocationData.countryRegion &&
      JSON.stringify(currentLocationData) !== JSON.stringify(newLocationData)
    ) {
      gameSettings.setIsLocationChanged(true);
      NotificationService.localNotification(
        i18n.t('notification:changeTitle'),
        i18n.t('notification:changeMessage', {
          newLocation: newLocationData.adminDistrict || newLocationData.countryRegion,
        }),
      );
    }
  };

  stopGame = async () => {
    const { location, gameSettings, gameData } = this.props.rootStore;
    location.reset();
    gameSettings.reset();
    gameData.reset();
    NotificationService.cancelNotifications();
    LocationManager.stopWatching();
    await AsyncStorage.clear();
  };

  startGame = async () => {
    const {
      rootStore: { gameSettings, gameData },
      navigation,
    } = this.props;
    this.setState({
      loading: true,
    });

    const { status } = await this.updateLocation();
    if (status !== 'success') {
      return this.setState({
        loading: false,
      });
    }
    // exeptions to handle
    const quizSnapshot = await firestore().collection('quizzes').get();

    const challengesSnapshot = await firestore().collection('challenges').get();

    quizSnapshot.docs.map((quiz) => {
      const quizData = quiz.data();
      if (quizData) {
        quizData.id = quiz.id;
        quizData.answers = [quizData.correct_answer, ...quizData.incorrect_answers].sort(() => Math.random() - 0.5);

        gameData.setQuizzes(quizData as QuestionData);
      }
    });

    challengesSnapshot.docs.map((challenge) => {
      const challengeData = challenge.data() as Challenge;
      if (challengeData) {
        gameData.setChallenges(challengeData);
      }
    });

    this.setState({
      loading: false,
    });

    gameSettings.setIsGameActive(true);
    navigation.navigate('Quiz', {
      updateLocation: this.updateLocation,
    });
  };

  continueGame = async () => {
    this.setState({
      loading: true,
    });
    const { status } = await this.updateLocation();
    this.setState({
      loading: false,
    });
    if (status !== 'success') {
      return;
    }
    this.props.rootStore.gameSettings.setIsGameActive(true);
    this.props.navigation.navigate('Quiz', {
      updateLocation: this.updateLocation,
    });
  };

  renderBottomButtons = () => {
    const { loading } = this.state;
    const {
      gameSettings: { isGameActive },
    } = this.props.rootStore;

    if (!isGameActive) {
      return <Button title={i18n.t('home:start')} onPress={this.startGame} type="regular" loading={loading} />;
    }
    return (
      <>
        <Button title={i18n.t('home:goTo')} onPress={this.continueGame} type="regular" loading={loading} />
        <Button title={i18n.t('home:stop')} onPress={this.stopGame} type="textButton" />
      </>
    );
  };

  renderLocalScoreboards = () => {
    const {
      gameSettings: { locationScores },
    } = this.props.rootStore;

    const data = Object.keys(locationScores).map((locationScore, index) => ({
      ...locationScores[locationScore],
      locationName: locationScore,
      index,
    }));
    return data.length ? (
      <FlatList
        data={data}
        renderItem={(item) => <LocalScoreboard item={{ ...item }} key={item.index} />}
        keyExtractor={(item) => item.id}
      />
    ) : (
      <FakeScoreboards />
    );
  };

  render() {
    const {
      gameSettings: { isGameActive, score, badges },
    } = this.props.rootStore;

    const goldBadges = badges.filter((badge: string) => badge === BADGES.GOLD).length;
    const silverBadges = badges.filter((badge: string) => badge === BADGES.SILVER).length;
    return (
      <Template>
        <View style={styles.mainContainer}>
          <View style={styles.carouselContainer}>
            {isGameActive ? (
              <>
                <Scoreboard goldBadges={goldBadges} silverBadges={silverBadges} score={score} />
                {this.renderLocalScoreboards()}
              </>
            ) : (
              <TipCarousel />
            )}
          </View>
          <View style={styles.buttonsContainer}>{this.renderBottomButtons()}</View>
        </View>
      </Template>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  carouselContainer: {
    flex: 4,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});

export default inject('rootStore')(observer(HomeScreen));
