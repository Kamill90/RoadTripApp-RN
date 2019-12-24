import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Alert, Dimensions } from 'react-native';
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

const SCREEN_HEIGHT = Dimensions.get('screen').height;

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
      () => {
        NotificationService.localNotification('');
        if (this.props.gameSettingsResults.gameSettings.isGameActive) {
          // Required: Signal completion of your task to native code
          // If you fail to do this, the OS can terminate your app
          // or assign battery-blame for consuming too much background-time
          BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
        }
      },
      error => {
        console.log('[js] RNBackgroundFetch failed to start', error);
      },
    );
  }

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
          <View style={styles.scoreContainer}>
            {gameSettings.isGameActive && (
              <ScoreBox
                score={gameSettings.score!}
                noOfQuestions={gameSettings.answeredQuestions.length - 1}
              />
            )}
          </View>
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
          </View>
          {gameSettings.isLocationChanged && gameSettings.isGameActive && (
            <Text style={typography.popupInfo}>
              {i18n.t('announcement:newQuiz')}
            </Text>
          )}
        </View>
      </Template>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: SCREEN_HEIGHT * 0.7,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  scoreContainer: {
    marginVertical: 100,
    height: 300,
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
