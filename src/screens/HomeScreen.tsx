import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Alert, AppState } from 'react-native';
import { graphql } from 'react-apollo';
import { NavigationInjectedProps, NavigationEvents } from 'react-navigation';
import compose from 'lodash.flowright';
import BackgroundFetch from 'react-native-background-fetch';

import {
  setLocationDataMutation,
  LocationData,
  AddressData,
  LocationDataResults,
  LocationDataResponse,
  setGameSettingsMutation,
  gameSettingsQuery,
  GameSettingsResults,
  GameSettingsResponse,
  persistor,
  client,
  initialData,
  locationDataQuery,
  FetchLocation,
  GameSettingsMutationVariables,
} from 'api';
import { Button, Template, ScoreBox } from 'components';
import { i18n } from 'locale';
import { LocationManager, NotificationService } from 'services';
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
        minimumFetchInterval: 30, // <-- minutes (15 is minimum allowed)
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
      return;
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
    // Required: Signal completion of your task to native code
    // If you fail to do this, the OS can terminate your app
    // or assign battery-blame for consuming too much background-time
    BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
  };

  updateLocation = async (): Promise<{ status: FetchLocation }> => {
    const {
      locationDataResults: { locationData },
    } = this.props;

    const currentLocationData = {
      countryRegion: locationData.countryRegion,
      adminDistrict: locationData.adminDistrict,
      adminDistrict2: locationData.adminDistrict2,
      formattedAddress: locationData.formattedAddress,
    };
    try {
      const address = (await LocationManager.getCurrentLocation()) as AddressData;
      const newLocationData = {
        countryRegion: address.countryRegion,
        adminDistrict: address.adminDistrict,
        adminDistrict2: address.adminDistrict2,
        formattedAddress: address.formattedAddress,
      };
      this.props.setLocationData({
        variables: newLocationData,
      });
      if (
        JSON.stringify(currentLocationData) !== JSON.stringify(newLocationData)
      ) {
        this.props.setGameSettings({
          variables: {
            isLocationChanged: true,
          },
        });
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
    persistor.purge();
    client.cache.writeData(initialData);
    BackgroundFetch.stop();
    NotificationService.cancelNotifications();
    this.props.setGameSettings({
      variables: {
        isGameActive: false,
      },
    });
  };

  startGame = async () => {
    this.setState({
      loading: true,
    });
    const { status } = await this.updateLocation();
    if (status !== 'success') {
      return;
    }
    this.props.setGameSettings({
      variables: {
        isGameActive: true,
      },
    });
    this.goToGame();
  };

  goToGame = () => {
    this.props.navigation.navigate('Quiz');
  };

  render() {
    const {
      gameSettingsResults: { gameSettings },
    } = this.props;
    const { loading } = this.state;
    return (
      <Template>
        <NavigationEvents
          // bug on react-apollo
          onDidFocus={() => {
            setTimeout(async () => {
              await this.props.gameSettingsResults.refetch();
            });
          }}
        />
        <View style={styles.mainContainer}>
          {gameSettings.isGameActive && (
            <ScoreBox
              score={gameSettings.score!}
              noOfQuestions={gameSettings.answeredQuestions.length - 1}
            />
          )}
          <View style={styles.buttonsContainer}>
            {gameSettings.isGameActive ? (
              <>
                <Button
                  onPress={this.stopGame}
                  title={i18n.t('home:stop')}
                  type="regular"
                />
                <Button
                  title={i18n.t('home:goTo')}
                  onPress={this.startGame}
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
            {gameSettings.isLocationChanged && gameSettings.isGameActive && (
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonsContainer: {
    height: 120,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
});

export default compose(
  graphql<LocationDataResponse, LocationDataResults>(locationDataQuery, {
    name: 'locationDataResults',
  }),
  graphql<GameSettingsResponse, GameSettingsResults>(gameSettingsQuery, {
    name: 'gameSettingsResults',
  }),
  graphql(setGameSettingsMutation, { name: 'setGameSettings' }),
  graphql(setLocationDataMutation, { name: 'setLocationData' }),
)(HomeScreen);
