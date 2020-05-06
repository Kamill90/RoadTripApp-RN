import React, { PureComponent } from 'react';
import { Platform, PermissionsAndroid, StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'mobx-react';

import { RootStackNavigator } from './navigators/RootStackNavigator';
import { i18n } from 'locale';
import { rootStoreTrunk, rootStore } from './api';

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

class App extends PureComponent {
  async componentDidMount() {
    await rootStoreTrunk.init();
  }
  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider rootStore={rootStore}>
          <StatusBar barStyle="dark-content" />
          <AppContainer />
        </Provider>
      </I18nextProvider>
    );
  }
}

export default App;
