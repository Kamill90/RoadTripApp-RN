import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
// import { fonts } from '../styles';
import { palette } from 'styles';

interface Props extends TextProps {
  children: string;
}

export const StyledText: React.FunctionComponent<Props> = ({
  children,
  ...props
}) => {
  return (
    <Text { ...props } style={ [styles.text, props.style] }>
      { children }
    </Text>
  );
};

StyledText.displayName = 'StyledText';

const styles = StyleSheet.create({
  text: {
    // color: palette.mainGrey,
  },
});
