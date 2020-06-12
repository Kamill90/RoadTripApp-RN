import React from 'react';
import { View, StyleSheet } from 'react-native';
import { palette } from 'styles';

export const ProgressDots = ({
  data,
  active,
}: {
  data: any[];
  active: number;
}) => (
  <View style={styles.container}>
    {data.map((_element, index) => {
      const isDotActive = index === active ? 'activeDot' : 'dot';
      return <View style={styles[isDotActive]} key={index} />;
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: palette.grey,
  },
  activeDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: palette.secondary,
  },
});
