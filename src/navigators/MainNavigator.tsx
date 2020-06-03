import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

import { i18n } from 'locale';
import { icons } from 'assets';
import { customHeader } from 'components';
import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import SettingsScreen from '../screens/SettingsScreen';

export const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('home:title'),
        ...customHeader,
        headerRight: () => (
          <TouchableOpacity
            style={styles.iconCointainer}
            onPress={() => {
              navigation.navigate('Settings');
            }}
          >
            <Image source={icons.settings} style={styles.icon} />
          </TouchableOpacity>
        ),
      }),
    },
    Quiz: {
      screen: QuizScreen,
      navigationOptions: {
        title: i18n.t('home:title'),
        ...customHeader,
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: i18n.t('settings:title'),
        ...customHeader,
      },
    },
  },
  { headerMode: 'float', headerBackTitleVisible: false },
);

const styles = StyleSheet.create({
  iconCointainer: { padding: 10, justifyContent: 'center' },
  icon: { width: 30, height: 30 },
});
