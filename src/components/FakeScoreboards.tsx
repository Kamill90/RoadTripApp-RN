import React from 'react';
import { View, StyleSheet } from 'react-native';
import { palette } from 'styles';

export const FakeScoreboards = () => {
  return (
    <>
      <View style={[styles.container, styles.first]} />
      <View style={[styles.container, styles.second]} />
      <View style={[styles.container, styles.third]} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 8,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    shadowOpacity: 0.7,
    backgroundColor: palette.grey,
    shadowColor: palette.grey,
    shadowOffset: { height: 2, width: StyleSheet.hairlineWidth },
    elevation: 3,
  },
  first: {
    opacity: 0.8,
  },
  second: {
    opacity: 0.6,
  },
  third: {
    opacity: 0.4,
  },
});
