import { Easing, Animated } from 'react-native';
import {
  createStackNavigator,
  NavigationSceneRendererProps,
} from 'react-navigation-stack';

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
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: /* istanbul ignore next */ () => ({
      transitionSpec: {
        duration: 200,
        easing: Easing.inOut(Easing.quad),
        timing: Animated.timing,
      },
      screenInterpolator: /* istanbul ignore next */ (
        sceneProps: NavigationSceneRendererProps,
      ) => {
        const { position, scene } = sceneProps;
        const { index } = scene;

        const opacity = position.interpolate({
          inputRange: [index - 1, index],
          outputRange: [0, 1],
        });

        return { opacity };
      },
    }),
  },
);
