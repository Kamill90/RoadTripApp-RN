import React from 'react';
import { StyleSheet, View, TextProps } from 'react-native';
// import { fonts } from '../styles';
import { palette } from 'styles';

interface Props extends TextProps {
  children?: JSX.Element | JSX.Element[];
}

export const Template: React.FunctionComponent<Props> = ({
  children,
  ...props
}) => {
  return <View style={ styles.contentContainer }>{ children }</View>;
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 10,
    flexGrow: 1,
    backgroundColor: palette.mainBackground,
  },
});
