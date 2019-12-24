import React from 'react';
import { StyleSheet, ScrollView, TextProps } from 'react-native';
import { palette } from 'styles';

interface Props extends TextProps {
  children?: JSX.Element | JSX.Element[];
}

export const Template: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <ScrollView bounces={false} style={styles.contentContainer}>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 10,
    flexGrow: 1,
    backgroundColor: palette.mainBackground,
  },
});
