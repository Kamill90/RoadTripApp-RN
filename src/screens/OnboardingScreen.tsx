import { TipCarousel } from 'components';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { palette } from 'styles';

export class OnboardingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TipCarousel />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.white,
    paddingBottom: 100,
    flex: 1,
  },
});
