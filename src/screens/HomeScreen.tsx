import React, {PureComponent} from 'react';
import {StyleSheet, View, Button, Text, Alert} from 'react-native';
import {graphql} from 'react-apollo';
import {NavigationInjectedProps} from 'react-navigation';
import compose from 'lodash.flowright';

import {
  setLocationDataMutation,
  LocationData,
  AddressData,
  locationDataQuery,
  setGameSettingsMutation,
  gameSettingsQuery,
  GameSettings,
} from 'api';
import {LocationManager, NotificationService} from 'services';

const SEC = 10;
const INTERVAL_VALUE = SEC * 1000;
interface Props extends NavigationInjectedProps {
  setLocationData: ({variables}: {variables: LocationData}) => void;
  locationDataResults: any;
  setGameSettings: ({variables}: {variables: GameSettings}) => void;
  gameSettingsResults: any;
}

const notificationService = new NotificationService();

interface State {
  locationInterval: () => void;
}

class HomeScreen extends PureComponent<Props> {
  state = {
    locationInterval: setInterval(() => {}),
  };

  updateLocation = async () => {
    notificationService.scheduledNotification();
    const {locationDataResults} = this.props;
    let updateVariable;
    try {
      const address = (await LocationManager.getCurrentLocation()) as AddressData;
      if (
        locationDataResults.locationData.adminDistrict !== address.adminDistrict
      ) {
        notificationService.localNotification();
        updateVariable = {
          countryRegion: address.countryRegion,
          adminDistrict: address.adminDistrict,
          adminDistrict2: address.adminDistrict2,
          counter: this.props.locationDataResults.locationData.counter + 1,
        };
      } else {
        updateVariable = {
          counter: this.props.locationDataResults.locationData.counter + 1,
        };
      }
      this.props.setLocationData({
        variables: updateVariable,
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
    // this.setState({
    //   locationInterval: setInterval(this.updateLocation, INTERVAL_VALUE),
    // });
  };

  goToGame = () => {
    this.props.navigation.navigate('Quiz');
  };

  sendLocalNotification = () => {
    notificationService.scheduledNotification();
  };

  render() {
    const {locationDataResults, gameSettingsResults} = this.props;
    console.warn('score', gameSettingsResults.gameSettings.score);
    return (
      <View style={styles.mainContainer}>
        <Text>
          Is game active:
          {gameSettingsResults.gameSettings.isGameActive.toString()}
        </Text>
        {/* <Text>counter: {locationDataResults.locationData.counter}</Text>
        <Text>
          countryRegion:
          {locationDataResults.locationData.countryRegion}
        </Text>
        <Text>
          adminDistrict2:
          {locationDataResults.locationData.adminDistrict2}
        </Text>
        <Text>
          adminDistrict:
          {locationDataResults.locationData.adminDistrict}
        </Text> */}
        {gameSettingsResults.gameSettings.isGameActive ? (
          <Button title="Stop the game" onPress={this.stopGame} />
        ) : (
          <Button title="Start the game" onPress={this.startGame} />
        )}
        <Button
          title="Send local notification"
          onPress={this.sendLocalNotification}
        />
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
  graphql(locationDataQuery, {name: 'locationDataResults'}),
  graphql(setLocationDataMutation, {name: 'setLocationData'}),
  graphql(gameSettingsQuery, {name: 'gameSettingsResults'}),
  graphql(setGameSettingsMutation, {name: 'setGameSettings'}),
)(HomeScreen);
