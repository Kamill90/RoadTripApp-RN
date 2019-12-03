import {createStackNavigator} from 'react-navigation-stack';

import {MainNavigator} from './MainNavigator';

export const RootStackNavigator = createStackNavigator(
  {
    Main: MainNavigator,
  },
  {
    headerMode: 'none',
    mode: 'modal',
  },
);
