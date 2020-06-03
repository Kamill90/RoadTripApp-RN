import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { TipCarousel } from 'components';

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
  container: { backgroundColor: 'white', paddingBottom: 100 },
});
