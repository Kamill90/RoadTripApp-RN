import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Alert, AppState, Image } from 'react-native';
import { inject, observer } from 'mobx-react';
import { NavigationInjectedProps } from 'react-navigation';
import compose from 'lodash.flowright';
import BackgroundFetch from 'react-native-background-fetch';
import firestore from '@react-native-firebase/firestore';

import {
  LocationData,
  AddressData,
  LocationDataResults,
  GameSettingsResults,
  GameSettingsResponse,
  FetchLocation,
  GameSettingsMutationVariables,
  BADGES,
  QuestionData,
} from 'api';
import { Button, Template, ScoreBox } from 'components';
import { i18n } from 'locale';
import { LocationManager, NotificationService } from 'services';
import { images } from 'assets';
import { typography } from 'styles';

interface Props extends NavigationInjectedProps {
  locationDataResults: LocationDataResults;
  gameSettingsResults: GameSettingsResults;
  setGameSettings: ({
    variables,
  }: {
    variables: GameSettingsMutationVariables;
  }) => GameSettingsResponse;
  setLocationData: ({ variables }: { variables: LocationData }) => LocationData;
  setGameData: ({ variables }: { variables: QuestionData }) => QuestionData;
}

interface State {
  loading: boolean;
}

class HomeScreen extends PureComponent<Props, State> {
  state = {
    loading: false,
  };

  componentDidMount() {
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
        console.log('[js] RNBackgroundFetch failed to start', error);
      },
    );
  }

  backgroundProcess = async () => {
    const {
      gameSettingsResults: { gameSettings },
      locationDataResults: {
        locationData: { adminDistrict, countryRegion },
      },
    } = this.props;
    if (!gameSettings.isGameActive) {
      return BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
    }
    await this.updateLocation();
    if (AppState.currentState.match(/inactive|background/)) {
      if (gameSettings.isLocationChanged) {
        NotificationService.localNotification(
          `Welcome to ${adminDistrict || countryRegion}`,
        );
      } else {
        NotificationService.localNotification(
          'Hello there. Try quizes about current location',
        );
      }
    }
    BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
  };

  updateLocation = async (): Promise<{ status: FetchLocation }> => {
    const { location, gameSettings } = this.props;

    const currentLocationData = {
      countryRegion: location.countryRegion,
      adminDistrict: location.adminDistrict,
      adminDistrict2: location.adminDistrict2,
      formattedAddress: location.formattedAddress,
    };
    try {
      const address = (await LocationManager.getCurrentLocation()) as AddressData;
      const newLocationData = {
        countryRegion: address.countryRegion,
        formattedAddress: address.formattedAddress,
        adminDistrict: address.adminDistrict,
        adminDistrict2: address.adminDistrict2,
      };
      this.props.location.setLocationData(newLocationData);
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
    // persistor.purge();
    // client.cache.writeData(initialData);
    // BackgroundFetch.stop();
    // NotificationService.cancelNotifications();
    this.props.gameSettings.deactivateGame();
  };

  startGame = async () => {
    this.setState({
      loading: true,
    });
    //exeptions to handle
    const documentsSnapshot = await firestore()
      .collection('quizzes')
      .get();

    //cache it
    const quizes = documentsSnapshot.docs;
    quizes.forEach(quiz => {
      const quizData = { id: quiz.id, ...quiz.data() };
      this.props.gameData.setQuizzes(quizData);
    });
    const { status } = await this.updateLocation();
    if (status !== 'success') {
      return;
    }
    this.props.gameSettings.activateGame();
    this.props.navigation.navigate('Quiz');
  };

  continueGame = async () => {
    this.setState({
      loading: true,
    });
    const { status } = await this.updateLocation();
    if (status !== 'success') {
      return;
    }
    this.props.gameSettings.activateGame();
    this.props.navigation.navigate('Quiz');
  };

  render() {
    const {
      gameSettings: {
        isGameActive,
        score,
        badges,
        answeredQuestions,
        isLocationChanged,
      },
    } = this.props;
    const { loading } = this.state;

    const goldBadges = badges.filter(badge => badge === BADGES.GOLD).length;

    const silverBadges = badges.filter(badge => badge === BADGES.SILVER).length;

    return (
      <Template>
        <View style={styles.mainContainer}>
          {isGameActive && (
            <>
              <View style={styles.badgeContainer}>
                {!!goldBadges && (
                  <>
                    <Image
                      source={images.medal_gold}
                      style={styles.minibadges}
                    />
                    <Text style={typography.secondaryInfo}>x{goldBadges}</Text>
                  </>
                )}
                {!!silverBadges && (
                  <>
                    <Image
                      source={images.medal_silver}
                      style={styles.minibadges}
                    />
                    <Text style={typography.secondaryInfo}>
                      x{silverBadges}
                    </Text>
                  </>
                )}
              </View>
              <ScoreBox
                score={score!}
                noOfQuestions={answeredQuestions.length - 1}
              />
            </>
          )}
          <View style={styles.buttonsContainer}>
            {isGameActive ? (
              <>
                <Button
                  onPress={this.stopGame}
                  title={i18n.t('home:stop')}
                  type="regular"
                />
                <Button
                  title={i18n.t('home:goTo')}
                  onPress={this.continueGame}
                  type="regular"
                  loading={loading}
                />
              </>
            ) : (
              <Button
                title={i18n.t('home:start')}
                onPress={this.startGame}
                type="regular"
                loading={loading}
              />
            )}
            {isLocationChanged && isGameActive && (
              <Text style={typography.popupInfo}>
                {i18n.t('announcement:newQuiz')}
              </Text>
            )}
          </View>
        </View>
      </Template>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: 50,
    alignItems: 'center',
  },
  buttonsContainer: {
    height: 120,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  minibadges: { width: 50, height: 50 },
  badgeContainer: {
    flexDirection: 'row',
    width: '100%',
  },
});

export default compose(
  inject('gameSettings'),
  inject('gameData'),
  inject('location'),
)(observer(HomeScreen));
