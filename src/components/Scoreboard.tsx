import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { Score } from 'api';
import { icons } from 'assets';
import { ScoreBox } from './ScoreBox';

export const Scoreboard = ({
  goldBadges,
  silverBadges,
  score,
  noOfQuestions,
}: Score) => {
  return (
    <>
      <ScoreBox score={score!} noOfQuestions={noOfQuestions} />
      <View style={styles.badgeContainer}>
        {!!goldBadges &&
          [...Array(goldBadges)].map((item, index) => (
            <Image
              source={icons.medalGold}
              style={styles.minibadges}
              key={index}
            />
          ))}
        {!!silverBadges &&
          [...Array(silverBadges)].map((item, index) => (
            <Image
              source={icons.medalSilver}
              style={styles.minibadges}
              key={index}
            />
          ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  minibadges: { width: 50, height: 50 },
  badgeContainer: {
    flexDirection: 'row',
    width: '100%',
    margin: 20,
  },
});
