import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import { Button } from 'components';
import { palette, typography } from 'styles';
import { i18n } from 'locale';

interface Props {
  reason: string;
  question: string;
  answers: string[];
  onPress: (answer: string) => void;
}

export class QuizCard extends React.PureComponent<Props> {
  renderAnswerButtons = (): React.ReactNode => {
    const { answers, onPress } = this.props;
    answers.sort(() => Math.random() - 0.5);
    return answers.map((answer, index) => (
      <View key={index} style={styles.button}>
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
    const { question, reason } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          style={styles.scroll}
        >
          <Text style={[typography.secondaryInfo, styles.secondaryInfo]}>
            {i18n.t('quiz:category') + reason}
          </Text>
          <Text style={styles.question}>{question}</Text>
          <View style={styles.buttonsContainer}>
            {this.renderAnswerButtons()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: palette.grey,
    borderRadius: 15,
  },
  scroll: {
    borderRadius: 8,
    paddingBottom: 20,
  },
  secondaryInfo: { marginTop: 10 },
  button: {
    height: 40,
    marginBottom: 15,
  },
  buttonsContainer: { marginBottom: 20 },
  question: {
    marginTop: 10,
    marginBottom: 40,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
});
