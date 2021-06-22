import { icons } from 'assets';
import { customHeader } from 'components';
import { i18n } from 'locale';
import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { VerifyScreen, ProfileScreen, SignInScreen } from '../screens/authentication';

export const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('home:title'),
        ...customHeader,
        headerRight: () => (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {
                // if(!!SecureScore.token) {
                //   navigation.navigate('Profile');

                // }
                navigation.navigate('SignIn');
              }}
            >
              <Image source={icons.account} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {
                navigation.navigate('Settings');
              }}
            >
              <Image source={icons.settings} style={styles.icon} />
            </TouchableOpacity>
          </View>
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
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: i18n.t('account:title'),
        ...customHeader,
      },
    },
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        title: i18n.t('account:signInTitle'),
        ...customHeader,
      },
    },
    Verify: {
      screen: VerifyScreen,
      navigationOptions: {
        title: i18n.t('account:signUpTitle'),
        ...customHeader,
      },
    },
  },
  { headerMode: 'float', headerBackTitleVisible: false },
);

const styles = StyleSheet.create({
  iconContainer: { padding: 10, justifyContent: 'center' },
  icon: { width: 30, height: 30 },
});
