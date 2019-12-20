import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { palette } from 'styles';

interface Props {
  type: 'regular' | 'answer';
  title: string;
  onPress: () => void;
  loading?: boolean;
}

export const Button: React.FunctionComponent<Props> = ({ ...props }) => (
  <TouchableOpacity
    style={[styles.container, styles[props.type]]}
    onPress={props.onPress}
    disabled={props.loading}
    activeOpacity={0.5}
  >
    {props.loading ? (
      <ActivityIndicator size="small" color={palette.mainBlack} />
    ) : (
      <Text>{props.title}</Text>
    )}
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
  },
});
