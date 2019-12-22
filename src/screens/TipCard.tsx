import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';

import { Button } from 'components';
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
      <View style={styles.container}>
        <View
          style={[
            styles.contentContainer,
            {
              backgroundColor: isCorrect
                ? palette.primary
                : palette.wrongAnswerColor,
            },
          ]}
        >
          <View style={styles.titleContainer}>
            {!isCorrect ? (
              <>
                <Text style={typography.popupInfo}>{i18n.t('quiz:wrong')}</Text>
                <Text style={typography.popupInfo}>
                  {i18n.t('quiz:correctIs') + correctAnswer}
                </Text>
              </>
            ) : (
              <Text style={typography.popupInfo}>{i18n.t('quiz:right')}</Text>
            )}
          </View>
          {description.length > 2 && (
            <Text style={typography.description}>{description}</Text>
          )}
          <View style={styles.buttonContainer}>
            <Button
              title={i18n.t('quiz:continue')}
              type="answer"
              onPress={() => {
                navigation.goBack();
                onPress();
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  contentContainer: {
    justifyContent: 'space-between',
    width: '80%',
    borderRadius: 20,
    padding: 15,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderBottomColor: palette.mainBlack,
    borderBottomWidth: 2,
  },
  buttonContainer: {
    height: 100,
    justifyContent: 'flex-end',
  },
});
