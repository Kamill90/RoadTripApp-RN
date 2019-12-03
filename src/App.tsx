import React from 'react';
import {ApolloProvider} from 'react-apollo';
import {Platform, PermissionsAndroid} from 'react-native';
import {createAppContainer} from 'react-navigation';

import {RootStackNavigator} from './navigators/RootStackNavigator';
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

const AppContainer = createAppContainer(RootStackNavigator);

const App = () => (
  <ApolloProvider client={client}>
    <AppContainer />
  </ApolloProvider>
);

export default App;
