import { icons } from 'assets';
import { ModalTemplate, Button } from 'components';
import { i18n } from 'locale';
import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { palette, typography } from 'styles';

interface State {
  badge: string;
  extraPoints: number;
}

export class BadgeCard extends PureComponent<NavigationInjectedProps, State> {
  static getDerivedStateFromProps(props: NavigationInjectedProps, state: State) {
    if (state.badge.length) {
      return null;
    }
    const { navigation } = props;
    return {
      badge: navigation.getParam('badge'),
      extraPoints: navigation.getParam('extraPoints'),
    };
  }

  state = {
    badge: '',
    extraPoints: 0,
  };

  closeModal = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { badge, extraPoints } = this.state;
    return (
      <ModalTemplate>
        <View style={styles.contentContainer}>
          <Text style={typography.badgeTitle}>{i18n.t('badge:congratulation')}</Text>
          <Text style={typography.badgeDescription}>{i18n.t(`badge:${badge}Description`)}</Text>
          <Text style={typography.bigScore}>{`+ ${extraPoints} ${i18n.t('badge:points')}`}</Text>
          <Image source={icons[`medal${badge}`]} style={styles.badgeIcon} resizeMode="contain" />
          <Button
            type="textButton"
            backgroundColor={palette.transparent}
            title={i18n.t('badge:close')}
            onPress={this.closeModal}
          />
        </View>
      </ModalTemplate>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    width: '80%',
    height: 400,
    borderRadius: 20,
    padding: 15,
    backgroundColor: palette.secondary,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgeIcon: { height: 150 },
});
