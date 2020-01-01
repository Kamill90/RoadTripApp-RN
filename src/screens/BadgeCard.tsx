import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';

import { ModalTemplate } from 'components';
import { palette } from 'styles';

interface State {
  score: number;
}

export class BadgeCard extends PureComponent<NavigationInjectedProps, State> {
  //move as template
  static getDerivedStateFromProps(
    props: NavigationInjectedProps,
    state: State,
  ) {
    if (state.score) {
      return null;
    }
    const { navigation } = props;
    return {
      score: navigation.getParam('score'),
    };
  }

  state = {
    score: 0,
  };
  render() {
    return (
      <ModalTemplate>
        <View style={styles.contentContainer}>
          <Text>{this.state.score.toString()}</Text>
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
