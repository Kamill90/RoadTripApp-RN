import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import { Score } from 'api';
import { icons } from 'assets';
import { typography } from 'styles';
import { ScoreBox } from './ScoreBox';

export const Scoreboard = ({
  goldBadges,
  silverBadges,
  score,
  noOfQuestions,
}: Score) => {
  return (
    <>
      <View style={styles.badgeContainer}>
        {!!goldBadges && (
          <>
            <Image source={icons.medalGold} style={styles.minibadges} />
            <Text style={typography.secondaryInfo}>x{goldBadges}</Text>
          </>
        )}
        {!!silverBadges && (
          <>
            <Image source={icons.medalSilver} style={styles.minibadges} />
            <Text style={typography.secondaryInfo}>x{silverBadges}</Text>
          </>
        )}
      </View>
      <ScoreBox score={score!} noOfQuestions={noOfQuestions} />
    </>
  );
};

const styles = StyleSheet.create({
  minibadges: { width: 50, height: 50 },
  badgeContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 40,
  },
});
