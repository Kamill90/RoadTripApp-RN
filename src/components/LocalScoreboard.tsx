import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { palette, typography } from 'styles';

interface Props {
  item: {
    item: { answeredQuestions: number; score: number; locationName: string };
  };
}

export const LocalScoreboard = ({ item: { item } }: Props) => {
  const progress = `${(item.score / item.answeredQuestions) * 100}%`;
  const progressNumber = parseInt(progress, 10);
  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { width: progress }]} />
      <Text style={styles.barText}>{item.locationName}</Text>
      <Text style={styles.barText}>{`${progressNumber} %`}</Text>
    </View>
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
    backgroundColor: palette.white,
    borderRadius: 5,
    shadowOpacity: 0.7,
    shadowColor: palette.grey,
    shadowOffset: { height: 2, width: StyleSheet.hairlineWidth },
    elevation: 3,
  },
  barText: {
    ...typography.description,
    marginHorizontal: 20,
  },
  progressBar: {
    backgroundColor: palette.primary,
    position: 'absolute',
    height: '100%',
    borderRadius: 5,
  },
});
