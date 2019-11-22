import React from 'react';
import Config from 'react-native-config';
import {ApolloProvider} from 'react-apollo';
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
import {client} from './api';

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

const App = () => (
  <ApolloProvider client={client}>
    <AppContainer />
  </ApolloProvider>
);

export default App;
