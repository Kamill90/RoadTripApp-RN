import React from 'react';
import { Platform, PermissionsAndroid, StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'mobx-react';

import { RootStackNavigator } from './navigators/RootStackNavigator';
import { i18n } from 'locale';
import { locationStore, gameSettingsStore, gameDataStore } from './api';

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
  <I18nextProvider i18n={i18n}>
    <Provider
      gameSettings={gameSettingsStore}
      location={locationStore}
      gameData={gameDataStore}
    >
      <StatusBar barStyle="light-content" />
      <AppContainer />
    </Provider>
  </I18nextProvider>
);

export default App;
