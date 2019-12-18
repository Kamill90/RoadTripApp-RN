import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { palette, typography } from 'styles';

interface Props {
  question: string;
  description: string;
}

export class ResultCard extends React.PureComponent<Props> {
  render() {
    const { question, description } = this.props;
    return (
      <View style={styles.container}>
        <Text style={typography.basicInfo}>{question}</Text>
        <Text style={typography.description}> {description} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 250,
    padding: 30,
    backgroundColor: palette.secondaryBackground,
    borderWidth: 1,
    borderRadius: 15,
  },
});
