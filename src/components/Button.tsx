import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import { palette } from 'styles';

interface Props {
  type: 'regular' | 'answer';
  title: string;
  onPress: () => void;
}

export const Button: React.FunctionComponent<Props> = ({
  children,
  ...props
}) => (
    <TouchableOpacity style={ [styles.container, styles[props.type]] } onPress={ props.onPress }>
      <Text>{ props.title }</Text>
    </TouchableOpacity>
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    maxHeight: 50,
  },
  regular: {
    borderRadius: 20,
    backgroundColor: palette.secondary,
  },
  answer: {
    borderRadius: 8,
    backgroundColor: palette.button1,
  }
});
