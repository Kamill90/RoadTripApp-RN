import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
      <View key={ index } style={ styles.buttonContainer }>
        <Button
          title={ answer }
          onPress={ () => {
            onPress(answer);
          } }
          type="answer"
        />
      </View>
    ));
  };
  render() {
    const { question } = this.props;
    return (
      <View style={ styles.container }>
        <Text style={ styles.question }>{ question }</Text>
        { this.renderAnswerButtons() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: palette.secondaryBackground,
    borderWidth: 1,
    borderRadius: 15,
  },
  buttonContainer: {
    width: '100%',
    height: 40,
    marginVertical: 10,
  },
  question: {
    marginBottom: 40,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: palette.white
  },
});
