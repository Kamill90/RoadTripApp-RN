import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

import {LocationManager} from 'services';
import {AddressData} from 'api';

export class HomeScreen extends React.PureComponent {
  componentDidMount() {
    this.updateLocation();
  }
  updateLocation = async () => {
    try {
      const address = (await LocationManager.getCurrentLocation()) as AddressData;
      console.warn('address', address);
      //add address to global state
    } catch (error) {
      throw error;
    }
  };
  stopGame = () => {
    // clearInterval(this.state.locationInterval);
    // this.props.setLocationData({
    //   variables: {
    //     isGameActive: false,
    //   },
    // });
  };

  startGame = () => {
    // this.updateLocation();
    // this.props.setLocationData({
    //   variables: {
    //     isGameActive: true,
    //   },
    // });
    // this.setState({
    //   locationInterval: setInterval(this.updateLocation, INTERVAL_VALUE),
    // });
  };

  goToGame = () => {
    // this.props.navigation.navigate('Quiz');
  };

  sendLocalNotification = () => {
    // notificationService.scheduledNotification();
  };
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text>
          Is game active:
          {/* {locationDataResults.locationData.isGameActive.toString()} */}
        </Text>
        {/* <Text>counter: {locationDataResults.locationData.counter}</Text> */}
        <Text>
          countryRegion:
          {/* {locationDataResults.locationData.countryRegion} */}
        </Text>
        <Text>
          adminDistrict:
          {/* {locationDataResults.locationData.adminDistrict} */}
        </Text>
        {/* {locationDataResults.locationData.isGameActive ? (
          <Button title="Stop the game" onPress={this.stopGame} />
        ) : (
          <Button title="Start the game" onPress={this.startGame} />
        )} */}
        <Button title="Start the game" onPress={this.startGame} />
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
