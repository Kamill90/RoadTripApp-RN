import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

interface Props {
  question: string;
  answers: string[];
  onPress: (answer: string) => void;
}

export class QuizCard extends React.PureComponent<Props> {
  renderAnswerButtons = (): React.ReactNode => {
    const {answers, onPress} = this.props;
    return answers.map((answer, index) => (
      <Button
        key={index}
        title={answer}
        onPress={() => {
          onPress(answer);
        }}
      />
    ));
  };
  render() {
    const {question} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.question}>{question}</Text>
        {this.renderAnswerButtons()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
  },
  question: {
    marginBottom: 40,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
