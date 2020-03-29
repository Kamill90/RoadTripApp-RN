import React, { PureComponent } from 'react';
import { StyleSheet, View, Alert, AsyncStorage, AppState } from 'react-native';
import { inject, observer } from 'mobx-react';
import { NavigationInjectedProps } from 'react-navigation';
import BackgroundFetch from 'react-native-background-fetch';
import firestore from '@react-native-firebase/firestore';
import SplashScreen from 'react-native-splash-screen';

import {
  LocationData,
  LocationStore,
  GameSettingsStore,
  GameDataStore,
  FetchLocation,
  BADGES,
  QuestionData,
} from 'api';
import { Button, Template, TipCarousel } from 'components';
import { i18n } from 'locale';
import { LocationManager, NotificationService } from 'services';
import { palette } from 'styles';

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

  componentDidMount() {
    SplashScreen.hide();

    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
        // Android options
        stopOnTerminate: false,
        startOnBoot: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
        requiresCharging: false, // Default
        requiresDeviceIdle: false, // Default
        requiresBatteryNotLow: false, // Default
        requiresStorageNotLow: false, // Default
      },
      this.backgroundProcess,
      error => {
        // tslint:disable-next-line
        console.log('[js] RNBackgroundFetch failed to start', error);
      },
    );
  }

  backgroundProcess = async () => {
    const {
      gameSettings,
      location: { adminDistrict, countryRegion },
    } = this.props.rootStore;
    if (!gameSettings.isGameActive) {
      return BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
    }

    // title: i18n.t('common:notificationTitle'),
    // message: i18n.t('common:notificationMessage'),
    await this.updateLocation();
    if (AppState.currentState.match(/inactive|background/)) {
      if (gameSettings.isLocationChanged) {
        NotificationService.localNotification(
          i18n.t('notification:changeTitle'),
          i18n.t('notification:changeMessage', {
            newLocation: adminDistrict || countryRegion,
          }),
        );
      }
    }
    BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
  };

  updateLocation = async (): Promise<{ status: FetchLocation }> => {
    const { location, gameSettings } = this.props.rootStore;

    const currentLocationData = {
      countryRegion: location.countryRegion,
      adminDistrict: location.adminDistrict,
      adminDistrict2: location.adminDistrict2,
    };
    try {
      const address = (await LocationManager.getCurrentLocation()) as LocationData;
      const newLocationData = {
        countryRegion: address.countryRegion,
        adminDistrict: address.adminDistrict,
        adminDistrict2: address.adminDistrict2,
      } as LocationData;

      this.props.rootStore.location.setLocationData(newLocationData);
      if (
        JSON.stringify(currentLocationData) !== JSON.stringify(newLocationData)
      ) {
        gameSettings.setIsLocationChanged(true);
      }
      this.setState({
        loading: false,
      });
      return {
        status: 'success',
      };
    } catch (error) {
      this.setState({
        loading: false,
      });
      Alert.alert('Error', error);
      return {
        status: 'failure',
      };
    }
  };

  stopGame = async () => {
    const { location, gameSettings, gameData } = this.props.rootStore;
    location.reset();
    gameSettings.reset();
    gameData.reset();
    NotificationService.cancelNotifications();
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
    // exeptions to handle
    const quizSnapshot = await firestore()
      .collection('quizzes')
      .get();

    const challengesSnapshot = await firestore()
      .collection('challenges')
      .get();

    quizSnapshot.docs.map(quiz => {
      const quizData = quiz.data();
      if (quizData) {
        quizData.id = quiz.id;
        quizData.answers = [
          quizData.correct_answer,
          ...quizData.incorrect_answers,
        ].sort(() => Math.random() - 0.5);

        gameData.setQuizzes(quizData as QuestionData);
      }
    });

    challengesSnapshot.docs.map(challenge => {
      const challengeData = challenge.data();
      if (challengeData) {
        gameData.setChallenges(challengeData);
      }
    });

    const { status } = await this.updateLocation();
    if (status !== 'success') {
      return;
    }
    NotificationService.scheduledNotification(
      i18n.t('notification:staticTitle'),
      i18n.t('notification:staticMessage'),
    );
    gameSettings.setIsGameActive(true);
    navigation.navigate('Quiz');
  };

  continueGame = async () => {
    this.setState({
      loading: true,
    });
    const { status } = await this.updateLocation();
    if (status !== 'success') {
      return;
    }
    this.props.rootStore.gameSettings.setIsGameActive(true);
    this.props.navigation.navigate('Quiz');
  };

  render() {
    const {
      gameSettings: { isGameActive, score, badges, answeredQuestions },
    } = this.props.rootStore;
    const { loading } = this.state;

    const goldBadges = badges.filter((badge: string) => badge === BADGES.GOLD)
      .length;
    const silverBadges = badges.filter(
      (badge: string) => badge === BADGES.SILVER,
    ).length;

    return (
      <Template>
        <View style={styles.mainContainer}>
          <View style={styles.carouselContainer}>
            <TipCarousel
              containScoreboard={isGameActive}
              score={{
                goldBadges,
                silverBadges,
                score,
                noOfQuestions: answeredQuestions.length,
              }}
            />
          </View>
          <View style={styles.buttonsContainer}>
            {!isGameActive ? (
              <Button
                title={i18n.t('home:start')}
                onPress={this.startGame}
                type="regular"
                loading={loading}
              />
            ) : (
              <>
                <Button
                  title={i18n.t('home:goTo')}
                  onPress={this.continueGame}
                  type="regular"
                  loading={loading}
                />
                <Button
                  title={i18n.t('home:stop')}
                  onPress={this.stopGame}
                  backgroundColor={palette.transparent}
                  type="secondary"
                />
              </>
            )}
          </View>
        </View>
      </Template>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-between',
    paddingBottom: 50,
    flex: 1,
  },
  carouselContainer: {
    flex: 4,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
  },
  minibadges: { width: 50, height: 50 },
  badgeContainer: {
    flexDirection: 'row',
    width: '100%',
  },
});

export default inject('rootStore')(observer(HomeScreen));
