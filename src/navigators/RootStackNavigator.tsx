import { createStackNavigator } from 'react-navigation-stack';

import { MainNavigator } from './MainNavigator';
import { TipCard } from '../screens/TipCard';

export const RootStackNavigator = createStackNavigator(
  {
    Main: MainNavigator,
    TipCard,
  },
  {
    headerMode: 'none',
    mode: 'modal',
    transparentCard: true,
  },
);
