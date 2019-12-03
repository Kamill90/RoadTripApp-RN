import React, {Component} from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';
import {graphql} from 'react-apollo';
import {NavigationInjectedProps, NavigationEvents} from 'react-navigation';
import compose from 'lodash.flowright';

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
} from 'api';
import {LocationManager, NotificationService} from 'services';

const SEC = 10;
const INTERVAL_VALUE = SEC * 1000;
interface Props extends NavigationInjectedProps {
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
  // state = {
  //   locationInterval: setInterval(() => {}),
  // };

  updateLocation = async () => {
    try {
      const address = (await LocationManager.getCurrentLocation()) as AddressData;
      this.props.setLocationData({
        variables: {
          countryRegion: address.countryRegion,
          adminDistrict: address.adminDistrict,
          adminDistrict2: address.adminDistrict2,
        },
      });
      notificationService.scheduledNotification(address.countryRegion);
    } catch (error) {
      throw error;
    }
  };

  stopGame = async () => {
    persistor.purge();
    client.cache.writeData(initialData);
    // clearInterval(this.state.locationInterval);
    notificationService.cancelNotifications();
    this.props.setGameSettings({
      variables: {
        isGameActive: false,
      },
    });
  };

  startGame = () => {
    // register session so that you can avoid already answered questions
    this.updateLocation();
    this.props.setGameSettings({
      variables: {
        isGameActive: true,
      },
    });
    this.props.navigation.navigate('Quiz');

    // this.setState({
    //   locationInterval: setInterval(this.sendLocalNotification, INTERVAL_VALUE),
    // });
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
  },
});

export default compose(
  graphql(gameSettingsQuery, {
    name: 'gameSettingsResults',
  }),
  graphql<any>(setLocationDataMutation, {name: 'setLocationData'}),
  graphql(setGameSettingsMutation, {name: 'setGameSettings'}),
)(HomeScreen);
