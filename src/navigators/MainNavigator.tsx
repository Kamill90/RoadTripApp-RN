import {createStackNavigator} from 'react-navigation-stack';

import {HomeScreen} from '../screens/HomeScreen';

export const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Road trip game',
      },
    },
  },
  {headerMode: 'screen'},
);
