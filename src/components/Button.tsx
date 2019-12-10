import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import { StyledText } from './StyledText';
import { palette } from 'styles';

interface Props {
  title: string;
  onPress: () => void;
}

export const Button: React.FunctionComponent<Props> = ({
  children,
  ...props
}) => (
    <TouchableOpacity style={ styles.container } onPress={ props.onPress }>
      <StyledText>{ props.title }</StyledText>
    </TouchableOpacity>
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    maxHeight: 50,
    borderRadius: 20,
    backgroundColor: palette.secondary,
  },
});
