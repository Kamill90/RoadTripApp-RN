import { i18n } from 'locale';
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { typography } from 'styles';

import { AnswerButton } from './AnswerButton';

interface Props {
  reason: string;
  question: string;
  answers: string[];
  onPress: (answer: string) => void;
}

export class QuizCard extends React.PureComponent<Props> {
  renderAnswerButtons = (): React.ReactNode => {
    const { answers, onPress } = this.props;
    const prefixMap = ['A', 'B', 'C', 'D'];
    return answers.map((answer, index) => (
      <View key={index} style={styles.button}>
        <AnswerButton
          prefix={prefixMap[index]}
          title={answer}
          onPress={() => {
            onPress(answer);
          }}
        />
      </View>
    ));
  };

  render() {
    const { question, reason } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator bounces={false} style={styles.scroll}>
          <View style={styles.carouselHeader}>
            <Text style={[typography.secondaryInfo, styles.secondaryInfo]}>{i18n.t('quiz:category') + reason}</Text>
            <Text style={typography.question}>{question}</Text>
          </View>
          {this.renderAnswerButtons()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  button: {
    marginTop: 10,
  },
  scroll: {
    borderRadius: 8,
    paddingBottom: 20,
  },
  secondaryInfo: { marginTop: 10 },
  carouselHeader: {
    paddingVertical: 20,
  },
});
