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
            <Text style={typography.description}>{description}</Text>
            <Text style={[typography.description, { textAlign: 'center' }]}>
              Author:{' '}
            </Text>
            <Text style={[typography.description, { textAlign: 'center' }]}>
              Kamil
            </Text>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Button
              title={i18n.t('quiz:continue')}
              type="regular"
              backgroundColor={
                isCorrect ? palette.primary : palette.wrongAnswerColor
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
  descriptionContainer: { padding: 15 },
  correctAnswet: {
    marginVertical: 15,
  },
});
