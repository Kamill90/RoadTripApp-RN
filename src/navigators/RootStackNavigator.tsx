import { Easing, Animated } from 'react-native';
import {
  createStackNavigator,
  NavigationSceneRendererProps,
} from 'react-navigation-stack';

import { MainNavigator } from './MainNavigator';
import { OnboardingNavigator } from './OnboardingNavigator';

import { TipCard, BadgeCard } from 'screens';

export const RootStackNavigator = createStackNavigator(
  {
    Main: MainNavigator,
    Onboarding: OnboardingNavigator,
    BadgeCard,
    TipCard,
  },
  {
    headerMode: 'none',
    mode: 'modal',
    transparentCard: true,
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 200,
        easing: Easing.inOut(Easing.quad),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: (sceneProps: NavigationSceneRendererProps) => {
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
