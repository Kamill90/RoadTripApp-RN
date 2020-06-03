import { StyleSheet } from 'react-native';

import { palette } from './palette';

export const typography = StyleSheet.create({
  basicInfo: {
    fontSize: 16,
    letterSpacing: 0.4,
    fontWeight: '600',
    color: palette.white,
  },
  secondaryInfo: {
    fontFamily: 'Muli',
    fontSize: 15,
    letterSpacing: 0.4,
  },
  score: {
    fontSize: 20,
    letterSpacing: 0.5,
    color: palette.white,
    textTransform: 'uppercase',
    fontWeight: '800',
  },
  popupInfo: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Muli-SemiBold',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 16,
    letterSpacing: 0.3,
    lineHeight: 22,
    color: palette.mainBlack,
  },
  homeScreenVideoTitle: {
    fontSize: 24,
    letterSpacing: 0.44,
  },
  homeScreenVideoTitle2: {
    fontSize: 24,
    letterSpacing: 0.44,
  },
  bigScore: {
    fontSize: 30,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  badgeTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  badgeDescription: {
    fontSize: 16,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  tipDescription: {
    fontFamily: 'Muli-SemiBold',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  tipTitle: {
    fontSize: 18,
    fontFamily: 'Muli-SemiBold',
  },
  answerButtonTitle: {
    fontSize: 15,
    fontFamily: 'Muli',
  },
  question: {
    fontFamily: 'Muli-SemiBold',
    fontSize: 21,
  },
  result: {
    fontFamily: 'Muli-SemiBold',
    textTransform: 'uppercase',
    fontSize: 23,
    letterSpacing: 4,
  },
  subTitle: {
    fontFamily: 'Muli',
    fontSize: 12,
    letterSpacing: 0.4,
    textAlign: 'center',
  },
});
