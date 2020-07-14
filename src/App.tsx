import { i18n } from 'locale';
import { Provider } from 'mobx-react';
import React, { PureComponent } from 'react';
import { I18nextProvider } from 'react-i18next';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { createAppContainer } from 'react-navigation';

import { rootStoreTrunk, rootStore } from './api';
import { RootStackNavigator } from './navigators/RootStackNavigator';

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
          <StatusBar barStyle="dark-content" backgroundColor="rgba(0,0,0,0)" />
          <AppContainer />
        </Provider>
      </I18nextProvider>
    );
  }
}

export default App;
