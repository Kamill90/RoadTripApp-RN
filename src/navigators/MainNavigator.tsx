import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';

export const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Road trip game',
      },
    },
    Quiz: {
      screen: QuizScreen,
      navigationOptions: {
        title: 'Quiz',
      },
    },
  },
  {headerMode: 'screen'},
);
