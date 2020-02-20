import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import { palette } from 'styles';
import { i18n } from 'locale';

const customHeader = {
  headerStyle: {
    backgroundColor: palette.white,
    height: 50,
  },
  headerTintColor: palette.mainBlack,
  headerTitleStyle: {
    fontFamily: 'Pacifico',
    fontSize: 30,
    lineHeight: 40,
  },
};

export const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: i18n.t('home:name'),
        ...customHeader,
      },
    },
    Quiz: {
      screen: QuizScreen,
      navigationOptions: {
        title: i18n.t('home:name'),
        ...customHeader,
      },
    },
  },
  { headerMode: 'float', headerBackTitleVisible: false },
);
