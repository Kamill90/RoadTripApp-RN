import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { palette, typography } from 'styles';

interface Props {
  prefix: string;
  title: string;
  onPress: () => void;
}

export const AnswerButton: React.FunctionComponent<Props> = ({
  prefix,
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={onPress}
    >
      <View style={styles.prefix}>
        <Text style={typography.tipTitle}>{prefix}</Text>
      </View>

      <Text style={typography.answerButtonTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 4,
    height: 60,
    backgroundColor: palette.white,
    borderRadius: 5,
    shadowOpacity: 0.7,
    shadowColor: palette.grey,
    shadowOffset: { height: 2, width: StyleSheet.hairlineWidth },
    alignItems: 'center',
    elevation: 3,
    paddingHorizontal: 3,
  },
  prefix: {
    width: 45,
    height: 45,
    backgroundColor: palette.primary,
    borderRadius: 3,
    marginLeft: 7,
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});