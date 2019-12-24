/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from 'react';
import { Animated, StyleSheet, View, Text, ScrollView } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';

import { Button } from 'components';
import { palette, typography } from 'styles';
import { i18n } from 'locale';

interface State {
  isCorrect: boolean;
  description: string;
  correctAnswer: string;
  onPress: () => void;
  backgroundAnimation: any;
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
    backgroundAnimation: new Animated.Value(0),
  };

  async componentDidMount() {
    await Animated.timing(this.state.backgroundAnimation, {
      toValue: 1,
      duration: 2000,
    }).start();
  }

  render() {
    const backgroundColorAnimated = this.state.backgroundAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.2)'],
    });
    const { isCorrect, description, correctAnswer, onPress } = this.state;
    const { navigation } = this.props;
    return (
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: backgroundColorAnimated,
          },
        ]}
      >
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
          <View
            style={[
              styles.titleContainer,
              description.length > 2 && {
                borderBottomColor: palette.mainBlack,
                borderBottomWidth: 2,
              },
            ]}
          >
            {!isCorrect ? (
              <>
                <Text style={typography.score}>{i18n.t('quiz:wrong')}</Text>
                <Text style={typography.popupInfo}>
                  {i18n.t('quiz:correctIs') + correctAnswer}
                </Text>
              </>
            ) : (
              <Text style={typography.popupInfo}>{i18n.t('quiz:right')}</Text>
            )}
          </View>
          {description.length > 2 && (
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              style={styles.tipContainer}
            >
              <Text style={typography.description}>{description}</Text>
            </ScrollView>
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
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'space-between',
    width: '80%',
    maxHeight: '80%',
    borderRadius: 20,
    padding: 15,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  tipContainer: {
    paddingVertical: 20,
  },
  buttonContainer: {
    height: 50,
    marginVertical: 14,
    justifyContent: 'flex-end',
  },
});
