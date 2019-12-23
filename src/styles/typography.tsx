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
    fontSize: 12,
    letterSpacing: 0.4,
    color: palette.white,
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
    fontSize: 12,
    fontWeight: '600',
    color: palette.white,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 16,
    letterSpacing: 0.3,
    lineHeight: 22,
    color: palette.white,
    fontWeight: '400',
    textAlign: 'auto',
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
    fontSize: 60,
    letterSpacing: 0.5,
    color: palette.white,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
});
