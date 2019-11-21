import React from 'react';
import Config from 'react-native-config';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {createAppContainer} from 'react-navigation';

import {MainNavigator} from './navigators/MainNavigator';

if (Platform.OS === 'android') {
  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    {
      title: 'Location permission is needed',
      message: 'Content depends on your location ',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );
}

const AppContainer = createAppContainer(MainNavigator);

const App = () => <AppContainer />;

export default App;
