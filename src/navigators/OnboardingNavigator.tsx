import { customHeader } from 'components';
import { i18n } from 'locale';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { OnboardingScreen } from 'screens';
import { typography } from 'styles';

export const OnboardingNavigator = createStackNavigator(
  {
    Onboarding: {
      screen: OnboardingScreen,
      navigationOptions: ({ navigation }) => ({
        title: i18n.t('onboarding:aboutApp'),
        ...customHeader,
        headerTitleStyle: {
          fontFamily: 'Pacifico',
          fontSize: 30,
          flex: 1,
          textAlign: 'center',
          marginRight: 50,
        },
        headerLeft: () => (
          <TouchableOpacity
            style={styles.iconCointainer}
            onPress={() => {
              navigation.dismiss();
            }}
          >
            <Text style={styles.closeButton}>{i18n.t('onboarding:close')}</Text>
          </TouchableOpacity>
        ),
      }),
    },
  },
  { headerBackTitleVisible: true, mode: 'modal' },
);

const styles = StyleSheet.create({
  iconCointainer: { padding: 20, justifyContent: 'center' },
  closeButton: { ...typography.tipDescription, textTransform: 'uppercase' },
});
