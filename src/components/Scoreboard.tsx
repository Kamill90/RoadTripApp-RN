import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

import { Score } from 'api';
import { icons } from 'assets';
import { palette, typography } from 'styles';
import { i18n } from 'locale';

export const Scoreboard = ({ goldBadges, silverBadges, score }: Score) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('home:yourScore')}</Text>
      <Text style={styles.score}>{`${score}`}</Text>
      <View>
        <View style={styles.badgeContainer}>
          {!!goldBadges &&
            [...Array(goldBadges)].map((item, index) => (
              <Image
                source={icons.medalGold}
                style={styles.minibadges}
                key={index}
              />
            ))}
        </View>
        <View style={styles.badgeContainer}>
          {!!silverBadges &&
            [...Array(silverBadges)].map((item, index) => (
              <Image
                source={icons.medalSilver}
                style={styles.minibadges}
                key={index}
              />
            ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: palette.white,
    borderRadius: 10,
    shadowOpacity: 0.7,
    shadowColor: palette.grey,
    shadowOffset: { height: 2, width: StyleSheet.hairlineWidth },
    elevation: 3,
    margin: 20,
  },
  title: { ...typography.badgeTitle, margin: 10, alignSelf: 'center' },
  score: { ...typography.bigScore, alignSelf: 'center' },
  minibadges: { width: 30, height: 30 },
  badgeContainer: {
    alignSelf: 'stretch',
    overflow: 'hidden',
    flexDirection: 'row',
    marginTop: 15,
  },
});
