import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import { Button } from 'components';
import { palette } from 'styles';

interface Props {
  question: string;
  answers: string[];
  onPress: (answer: string) => void;
}

export class QuizCard extends React.PureComponent<Props> {
  renderAnswerButtons = (): React.ReactNode => {
    const { answers, onPress } = this.props;
    answers.sort(() => Math.random() - 0.5);
    return answers.map((answer, index) => (
      <View key={index} style={styles.buttonContainer}>
        <Button
          title={answer}
          onPress={() => {
            onPress(answer);
          }}
          type="answer"
        />
      </View>
    ));
  };
  render() {
    const { question } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.question}>{question}</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          style={styles.scroll}
        >
          {this.renderAnswerButtons()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 23,
    backgroundColor: palette.secondaryBackground,
    borderRadius: 15,
    maxHeight: '80%',
  },
  scroll: {
    borderRadius: 8,
  },
  buttonContainer: {
    width: '100%',
    height: 40,
    marginBottom: 15,
  },
  question: {
    marginBottom: 40,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: palette.white,
  },
});
