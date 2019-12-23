import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { typography, palette } from 'styles';
import { i18n } from 'locale';

interface Props {
  score: number;
  noOfQuestions: number;
}

export class ScoreBox extends PureComponent<Props> {
  render() {
    const { score, noOfQuestions } = this.props;
    return (
      <View style={styles.container}>
        <Text style={typography.popupInfo}>{i18n.t('home:yourScore')}</Text>
        <Text style={typography.bigScore}>{`${score} / ${noOfQuestions}`}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderRadius: 125,
    borderColor: palette.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
