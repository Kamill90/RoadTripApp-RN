import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { i18n } from 'locale';

import { palette, typography } from 'styles';

interface Props {
  content: string;
}

export class ChallengeCard extends React.PureComponent<Props> {
  render() {
    const { content } = this.props;
    return (
      <View style={styles.container}>
        <Text style={typography.question}>{i18n.t('challenge:title')}</Text>
        <Text style={styles.subtitle}>{i18n.t('challenge:subtitle')}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 30,
    backgroundColor: palette.wrongAnswerColor,
    borderRadius: 15,
    margin: 15,
  },
  subtitle: {
    ...typography.subTitle,
    marginBottom: 5,
  },
  content: {
    ...typography.description,
    fontWeight: '600',
    textAlign: 'center',
    borderColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
});
