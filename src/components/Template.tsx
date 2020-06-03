import React from 'react';
import { StyleSheet, View, TextProps } from 'react-native';
import { palette } from 'styles';

interface Props extends TextProps {
  children: React.ReactNode;
  withPadding?: boolean;
}

export const Template: React.FunctionComponent<Props> = ({
  withPadding,
  children,
}) => {
  return (
    <View style={[styles.contentContainer, withPadding && styles.padding]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    backgroundColor: palette.white,
  },
  padding: { padding: 20 },
});
