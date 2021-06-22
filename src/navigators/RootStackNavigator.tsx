import { Easing, Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { TipCard, BadgeCard, Modal } from 'screens';

import { MainNavigator } from './MainNavigator';
import { OnboardingNavigator } from './OnboardingNavigator';

export const RootStackNavigator = createStackNavigator(
  {
    Main: MainNavigator,
    Onboarding: OnboardingNavigator,
    // @ts-ignore
    BadgeCard,
    // @ts-ignore
    TipCard,
    Modal,
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
      screenInterpolator: (sceneProps: any) => {
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
