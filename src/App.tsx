import React, { PureComponent } from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'mobx-react';
import SplashScreen from 'react-native-splash-screen';

import { RootStackNavigator } from './navigators/RootStackNavigator';
import { i18n } from 'locale';
import { rootStoreTrunk, rootStore } from './api';

const AppContainer = createAppContainer(RootStackNavigator);

class App extends PureComponent {
  async componentDidMount() {
    SplashScreen.hide();
    await rootStoreTrunk.init();
  }
  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider rootStore={rootStore}>
          <StatusBar barStyle="light-content" />
          <AppContainer />
        </Provider>
      </I18nextProvider>
    );
  }
}

export default App;
