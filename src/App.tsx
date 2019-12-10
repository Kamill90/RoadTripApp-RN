import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Platform, PermissionsAndroid, StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { I18nextProvider } from 'react-i18next';

import { RootStackNavigator } from './navigators/RootStackNavigator';
import { i18n } from 'locale';
import { client } from './api';

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
  <I18nextProvider i18n={ i18n }>
    <ApolloProvider client={ client }>
      <StatusBar barStyle="light-content" />
      <AppContainer />
    </ApolloProvider>
  </I18nextProvider>
);

export default App;
