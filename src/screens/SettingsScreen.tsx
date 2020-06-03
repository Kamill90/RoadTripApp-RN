import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { inject, observer } from 'mobx-react';
import { NavigationInjectedProps } from 'react-navigation';

// import { NotificationService } from 'services';
import { Template, StyledCollapsible, StyledSwitch } from 'components';
import { typography } from 'styles';
import { i18n } from 'locale';
import { icons } from 'assets';
import { GameSettingsStore } from 'api';

interface Props extends NavigationInjectedProps {
  rootStore: {
    gameSettings: GameSettingsStore;
  };
}

class SettingsScreen extends Component<Props> {
  renderCollapsableRow = ({
    title,
    description,
    onPress,
    value,
  }: {
    title: string;
    description: string;
    onPress: (value: boolean) => void;
    value: boolean;
  }) => (
    <View style={styles.collapsableRow}>
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>{title}</Text>
        <Text style={styles.rowDescription}>{description}</Text>
      </View>
      <StyledSwitch value={value} onValueChange={onPress} />
    </View>
  );

  renderRow = ({
    title,
    description,
    onPress,
  }: {
    title: string;
    description?: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={typography.question}>{title}</Text>
        <Text style={styles.rowDescription}>{description}</Text>
      </View>
      <Image source={icons.chevronDown} style={[styles.chevronRight]} />
    </TouchableOpacity>
  );

  render() {
    const {
      rootStore: { gameSettings },
    } = this.props;
    return (
      <Template withPadding>
        {gameSettings.isGameActive && (
          <StyledCollapsible title={i18n.t('settings:notifications')}>
            {this.renderCollapsableRow({
              title: i18n.t('settings:reminder'),
              description: i18n.t('settings:reminderDescription'),
              value: gameSettings.isReminderActive,
              onPress: () => {
                gameSettings.setReminder(!gameSettings.isReminderActive);
              },
            })}
            {this.renderCollapsableRow({
              title: i18n.t('settings:newLocation'),
              description: i18n.t('settings:newLocationDescription'),
              value: gameSettings.isLocationNotificationActive,
              onPress: () => {
                gameSettings.setLocationNotification(
                  !gameSettings.isLocationNotificationActive,
                );
              },
            })}
          </StyledCollapsible>
        )}
        {this.renderRow({
          title: i18n.t('settings:createQuestions'),
          description: i18n.t('settings:createQuestionsDescription'),
          onPress: () =>
            Linking.openURL(
              'https://docs.google.com/forms/d/e/1FAIpQLSdcrMz_cnWtEdo_Mu7HgBd2lJLnLFEPPXYvzQq3Pqz2D7qF1g/viewform',
            ),
        })}
        {gameSettings.isGameActive &&
          this.renderRow({
            title: i18n.t('settings:showOnboarding'),
            onPress: () => {
              this.props.navigation.navigate('Onboarding');
            },
          })}
      </Template>
    );
  }
}

const styles = StyleSheet.create({
  collapsableRow: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  textContainer: { flex: 1, paddingRight: 20, alignItems: 'flex-start' },
  itemText: {
    ...typography.tipTitle,
    marginBottom: 3,
  },
  chevronRight: {
    width: 24,
    height: 24,
    transform: [{ rotate: '-90deg' }],
  },
  rowDescription: { ...typography.subTitle, textAlign: 'left' },
});

export default inject('rootStore')(observer(SettingsScreen));
