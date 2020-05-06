import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextStyle,
} from 'react-native';

import { palette } from 'styles';

interface Props {
  type: 'regular' | 'answer' | 'secondary' | 'textButton';
  title: string;
  onPress: () => void;
  loading?: boolean;
  backgroundColor?: string;
  titleStyle?: TextStyle;
}

export const Button: React.FunctionComponent<Props> = ({ ...props }) => (
  <TouchableOpacity
    style={styles[props.type]}
    onPress={props.onPress}
    disabled={props.loading}
    activeOpacity={0.5}
  >
    {props.loading ? (
      <ActivityIndicator size="small" color={palette.mainBlack} />
    ) : (
      <Text style={props.titleStyle}>{props.title}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  regular: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 50,
    borderRadius: 20,
    backgroundColor: palette.primary,
  },
  secondary: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 50,
    borderRadius: 20,
    backgroundColor: palette.wrongAnswerColor,
  },
  textButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 50,
    borderRadius: 20,
    opacity: 1,
  },
});
