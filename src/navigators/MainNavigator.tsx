import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import { palette } from 'styles';

const darkHeaderOption = {
  headerStyle: {
    backgroundColor: palette.mainBlack,
  },
  headerTintColor: palette.white,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Road trip game',
        ...darkHeaderOption,
      },
    },
    Quiz: {
      screen: QuizScreen,
      navigationOptions: {
        title: 'Quiz',
        ...darkHeaderOption,
      },
    },
  },
  { headerMode: 'screen' },
);
