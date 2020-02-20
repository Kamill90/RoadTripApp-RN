import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';

import { ModalTemplate, Button } from 'components';
import { icons } from 'assets';
import { palette, typography } from 'styles';
import { i18n } from 'locale';

interface State {
  badge: string;
}

export class BadgeCard extends PureComponent<NavigationInjectedProps, State> {
  static getDerivedStateFromProps(
    props: NavigationInjectedProps,
    state: State,
  ) {
    if (state.badge.length) {
      return null;
    }
    const { navigation } = props;
    return {
      badge: navigation.getParam('badge'),
    };
  }

  state = {
    badge: '',
  };

  closeModal = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { badge } = this.state;
    return (
      <ModalTemplate>
        <View style={styles.contentContainer}>
          <Text style={typography.badgeTitle}>
            {i18n.t('badge:congratulation')}
          </Text>
          <Text style={typography.badgeDescription}>
            {i18n.t(`badge:${badge}Description`)}
          </Text>
          <Image source={icons[`medal${badge}`]} style={styles.badgeIcon} />
          <Button
            type="regular"
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
  badgeIcon: { width: 200, height: 200 },
});
