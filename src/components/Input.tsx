import React from 'react';
import { StyleSheet, Text, View, TextInput as RNInput } from 'react-native';
import { palette } from 'styles';

interface Props {
  title: string;
}

export const Input = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>{props.title}</Text>
      <RNInput {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
    borderColor: palette.mainBlack,
    borderWidth: 1,
  },
});
