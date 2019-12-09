import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

interface Props {
  question: string;
}

export class ResultCart extends React.PureComponent<Props> {
  render() {
    const {question} = this.props;
    return (
      <View style={styles.container}>
        <Text>{question}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
