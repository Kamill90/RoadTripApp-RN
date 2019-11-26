import React, {PureComponent} from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';
import {graphql} from 'react-apollo';
import {NavigationInjectedProps} from 'react-navigation';
import compose from 'lodash.flowright';

import {
  setLocationDataMutation,
  LocationData,
  LocationDataResults,
  AddressData,
  locationDataQuery,
  setGameSettingsMutation,
  gameSettingsQuery,
  GameSettingsResults,
  GameSettingsResponse,
  GameSettings,
} from 'api';
import {LocationManager, NotificationService} from 'services';

const SEC = 10;
const INTERVAL_VALUE = SEC * 1000;
interface Props extends NavigationInjectedProps {
  setLocationData: ({variables}: {variables: LocationData}) => LocationData;
  locationDataResults: LocationDataResults;
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

class HomeScreen extends PureComponent<Props, State> {
  state = {
    locationInterval: setInterval(() => {}),
  };

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
    } catch (error) {
      throw error;
    }
  };

  stopGame = () => {
    clearInterval(this.state.locationInterval);
    this.props.setGameSettings({
      variables: {
        isGameActive: false,
      },
    });
  };

  startGame = () => {
    this.updateLocation();
    this.props.setGameSettings({
      variables: {
        isGameActive: true,
      },
    });
    this.props.navigation.navigate('Quiz');

    this.setState({
      locationInterval: setInterval(this.updateLocation, INTERVAL_VALUE),
    });
  };

  goToGame = () => {
    this.props.navigation.navigate('Quiz');
  };

  sendLocalNotification = () => {
    notificationService.scheduledNotification();
  };

  render() {
    console.log(this.props);
    const {gameSettingsResults} = this.props;
    return (
      <View style={styles.mainContainer}>
        {gameSettingsResults.gameSettings.isGameActive ? (
          <Button title="Stop the game" onPress={this.stopGame} />
        ) : (
          <Button title="Start the game" onPress={this.startGame} />
        )}
        <Button title="Go to the game" onPress={this.goToGame} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default compose(
  graphql<any>(locationDataQuery, {
    name: 'locationDataResults',
  }),
  graphql(setLocationDataMutation, {name: 'setLocationData'}),
  graphql(gameSettingsQuery, {
    name: 'gameSettingsResults',
  }),
  graphql(setGameSettingsMutation, {name: 'setGameSettings'}),
)(HomeScreen);
