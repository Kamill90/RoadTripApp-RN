import React from 'react';
import { StyleSheet, View, TextProps } from 'react-native';
import { palette } from 'styles';

interface Props extends TextProps {
  children?: JSX.Element | JSX.Element[];
}

export const Template: React.FunctionComponent<Props> = ({ children }) => {
  return <View style={styles.contentContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    backgroundColor: palette.white,
  },
});
