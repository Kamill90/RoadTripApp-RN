import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';

import { ModalTemplate } from 'components';
import { palette } from 'styles';

interface State {
  badge: string;
}

export class BadgeCard extends PureComponent<NavigationInjectedProps, State> {
  //move as template
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
  render() {
    return (
      <ModalTemplate>
        <View style={styles.contentContainer}>
          <Text>{this.state.badge}</Text>
        </View>
      </ModalTemplate>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'space-between',
    width: '80%',
    height: 300,
    borderRadius: 20,
    padding: 15,
    backgroundColor: palette.secondary,
  },
});
