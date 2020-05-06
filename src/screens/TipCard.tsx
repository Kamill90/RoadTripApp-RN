/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';

import { Button, ModalTemplate } from 'components';
import { palette, typography } from 'styles';
import { i18n } from 'locale';

interface State {
  isCorrect: boolean;
  description: string;
  correctAnswer: string;
  onPress: () => void;
}

export class TipCard extends PureComponent<NavigationInjectedProps, State> {
  static getDerivedStateFromProps(
    props: NavigationInjectedProps,
    state: State,
  ) {
    if (state.description) {
      return null;
    }
    const { navigation } = props;
    return {
      isCorrect: navigation.getParam('isCorrect'),
      description: navigation.getParam('description'),
      correctAnswer: navigation.getParam('correctAnswer'),
      onPress: navigation.getParam('onPress'),
    };
  }

  state = {
    title: '',
    isCorrect: false,
    description: '',
    correctAnswer: '',
    onPress: () => null,
  };

  render() {
    const { isCorrect, description, correctAnswer, onPress } = this.state;
    const { navigation } = this.props;
    return (
      <ModalTemplate>
        <View style={styles.contentContainer}>
          <View
            style={[
              styles.titleContainer,
              {
                backgroundColor: isCorrect
                  ? palette.primary
                  : palette.wrongAnswerColor,
              },
            ]}
          >
            {!isCorrect ? (
              <>
                <Text style={typography.result}>{i18n.t('quiz:wrong')}</Text>
              </>
            ) : (
              <Text style={typography.result}>{i18n.t('quiz:right')}</Text>
            )}
          </View>

          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            style={styles.descriptionContainer}
          >
            {!isCorrect && (
              <Text style={[typography.popupInfo, styles.correctAnswet]}>
                {i18n.t('quiz:correctIs') + correctAnswer}
              </Text>
            )}
            {!!description && (
              <>
                <Text
                  style={[
                    typography.description,
                    {
                      marginVertical: 15,
                    },
                  ]}
                >
                  {description}
                </Text>
                <View style={styles.row}>
                  <Text
                    style={[typography.description, { textAlign: 'center' }]}
                  >
                    Author:{' '}
                  </Text>
                  <Text
                    style={[typography.description, { textAlign: 'center' }]}
                  >
                    Kamil
                  </Text>
                </View>
              </>
            )}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Button
              title={i18n.t('quiz:continue')}
              type={
                isCorrect
                  ? description
                    ? 'regular'
                    : 'textButton'
                  : 'secondary'
              }
              titleStyle={
                (isCorrect && !description && styles.buttonTitle) || undefined
              }
              onPress={() => {
                navigation.goBack();
                onPress();
              }}
            />
          </View>
        </View>
      </ModalTemplate>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'space-between',
    width: '80%',
    maxHeight: '80%',
    borderRadius: 20,
    backgroundColor: palette.white,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderRadius: 20,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
  buttonContainer: {
    height: 50,
    margin: 14,
    justifyContent: 'flex-end',
  },
  row: { flexDirection: 'row', paddingVertical: 10 },
  descriptionContainer: { paddingHorizontal: 15 },
  correctAnswet: {
    marginVertical: 15,
  },
  buttonTitle: {
    ...typography.description,
  },
});
