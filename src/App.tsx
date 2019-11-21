import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {createAppContainer} from 'react-navigation';

import {MainNavigator} from './navigators/MainNavigator';

const AppContainer = createAppContainer(MainNavigator);

const App = () => {
  return <AppContainer />;
};

export default App;
