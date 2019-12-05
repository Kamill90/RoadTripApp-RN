import React, {Component} from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';
import {graphql} from 'react-apollo';
import {NavigationInjectedProps, NavigationEvents} from 'react-navigation';
import compose from 'lodash.flowright';
import BackgroundFetch from 'react-native-background-fetch';

import {
  setLocationDataMutation,
  LocationData,
  AddressData,
  setGameSettingsMutation,
  gameSettingsQuery,
  GameSettingsResults,
  GameSettingsResponse,
  GameSettings,
  persistor,
  client,
  initialData,
  locationDataQuery,
} from 'api';
import {LocationManager, NotificationService} from 'services';

const MIN = 1;

const INTERVAL_VALUE = MIN * 60 * 1000;
interface Props extends NavigationInjectedProps {
  locationDataResults: any;
  setLocationData: ({variables}: {variables: LocationData}) => LocationData;
  setGameSettings: ({
    variables,
  }: {
    variables: GameSettings;
  }) => GameSettingsResponse;
  gameSettingsResults: GameSettingsResults;
}

const notificationService = new NotificationService();

interface State {
  locationInterval: any;
}

class HomeScreen extends Component<Props, State> {
  state = {
    locationInterval: setInterval(() => {}),
  };

  componentDidMount() {
    this.updateLocation();
    // Configure it.
    // BackgroundFetch.configure(
    //   {
    //     minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
    //     // Android options
    //     stopOnTerminate: false,
    //     startOnBoot: true,
    //     requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
    //     requiresCharging: false, // Default
    //     requiresDeviceIdle: false, // Default
    //     requiresBatteryNotLow: false, // Default
    //     requiresStorageNotLow: false, // Default
    //   },
    //   () => {
    //     console.log(
    //       'isGameActive',
    //       this.props.gameSettingsResults.gameSettings.isGameActive,
    //     );
    //     if (this.props.gameSettingsResults.gameSettings.isGameActive) {
    //       this.updateLocation();
    //       console.log('[js] Received background-fetch event');
    //       // Required: Signal completion of your task to native code
    //       // If you fail to do this, the OS can terminate your app
    //       // or assign battery-blame for consuming too much background-time
    //       BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
    //     }
    //   },
    //   error => {
    //     console.log('[js] RNBackgroundFetch failed to start');
    //   },
    // );
  }

  updateLocation = async () => {
    const {
      locationDataResults: {locationData},
    } = this.props;

    const currentLocationData = {
      countryRegion: locationData.countryRegion,
      adminDistrict: locationData.adminDistrict,
      adminDistrict2: locationData.adminDistrict2,
    };
    try {
      const address = (await LocationManager.getCurrentLocation()) as AddressData;
      const newLocationData = {
        countryRegion: address.countryRegion,
        adminDistrict: address.adminDistrict,
        adminDistrict2: address.adminDistrict2,
      };
      if (
        JSON.stringify(currentLocationData) !== JSON.stringify(newLocationData)
      ) {
        this.props.setGameSettings({
          variables: {
            isLocationChanged: true,
          },
        });
        this.props.setLocationData({
          variables: newLocationData,
        });
      }
      // !!notification shoulb be handled by background process or external service
      // notificationService.scheduledNotification(address.formattedAddress);
      // notificationService.localNotification(address.formattedAddress); //works on android
    } catch (error) {
      throw error;
    }
  };

  stopGame = async () => {
    persistor.purge();
    client.cache.writeData(initialData);
    clearInterval(this.state.locationInterval);
    notificationService.cancelNotifications();
    this.props.setGameSettings({
      variables: {
        isGameActive: false,
      },
    });
  };

  startGame = () => {
    this.props.setGameSettings({
      variables: {
        isGameActive: true,
      },
    });
    this.goToGame();

    this.setState({
      locationInterval: setInterval(this.updateLocation, INTERVAL_VALUE),
    });
  };

  goToGame = () => {
    this.props.navigation.navigate('Quiz');
  };

  render() {
    const {
      gameSettingsResults: {gameSettings},
    } = this.props;
    return (
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <NavigationEvents
          //bug on apoll-react
          onDidFocus={() => {
            setTimeout(async () => {
              await this.props.gameSettingsResults.refetch();
            });
          }}
        />
        <View style={styles.mainContainer}>
          {gameSettings.isGameActive ? (
            <>
              <Button title="Stop the game" onPress={this.stopGame} />
              <Button title="Go to the game" onPress={this.goToGame} />
              {gameSettings.isLocationChanged && (
                <Text>new quiz available!</Text>
              )}
            </>
          ) : (
            <Button title="Start the game" onPress={this.startGame} />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 100,
    width: '100%',
    marginBottom: 100,
    alignItems: 'center',
  },
});

export default compose(
  graphql<any>(locationDataQuery, {
    name: 'locationDataResults',
  }),
  graphql(gameSettingsQuery, {
    name: 'gameSettingsResults',
  }),
  graphql<any>(setLocationDataMutation, {name: 'setLocationData'}),
  graphql(setGameSettingsMutation, {name: 'setGameSettings'}),
)(HomeScreen);
