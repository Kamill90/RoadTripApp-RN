import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { palette } from 'styles';

interface Props {
  type?: 'regular' | 'answer' | 'secondary';
  title: string;
  onPress: () => void;
  loading?: boolean;
  backgroundColor?: string;
}

export const Button: React.FunctionComponent<Props> = ({ ...props }) => (
  <TouchableOpacity
    style={[
      styles.container,
      props.backgroundColor ? { backgroundColor: props.backgroundColor } : null,
    ]}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 50,
    borderRadius: 20,
    backgroundColor: palette.primary,
  },
  secondary: {
    opacity: 1,
  },
});
