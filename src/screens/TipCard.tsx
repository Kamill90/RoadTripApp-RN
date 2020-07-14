/* eslint-disable react-native/no-inline-styles */
import { icons } from 'assets';
import { Button, ModalTemplate } from 'components';
import { i18n } from 'locale';
import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Linking, ScrollView, Image, TouchableOpacity } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { palette, typography } from 'styles';

interface State {
  isCorrect: boolean;
  description: string;
  correctAnswer: string;
  onPress: () => void;
}

export class TipCard extends PureComponent<NavigationInjectedProps, State> {
  static getDerivedStateFromProps(props: NavigationInjectedProps, state: State) {
    if (state.description) {
      return null;
    }
    const { navigation } = props;
    return {
      isCorrect: navigation.getParam('isCorrect'),
      description: navigation.getParam('description'),
      correctAnswer: navigation.getParam('correctAnswer'),
      onPress: navigation.getParam('onPress'),
      author: navigation.getParam('author'),
      link: navigation.getParam('link'),
    };
  }

  state = {
    title: '',
    isCorrect: false,
    description: '',
    author: '',
    link: '',
    correctAnswer: '',
    onPress: () => null,
  };

  renderAuthorRow = () => {
    const { link } = this.state;
    return (
      <View style={styles.row}>
        <Text style={styles.authorText}>{i18n.t('quiz:author')}</Text>
        {link ? (
          <TouchableOpacity onPress={() => Linking.openURL(link)} style={styles.linkRow}>
            <>
              <Text style={styles.linkText}>{this.state.author}</Text>
              <Image style={styles.icon} source={icons.externalLink} />
            </>
          </TouchableOpacity>
        ) : (
          <Text style={styles.authorText}>{this.state.author}</Text>
        )}
      </View>
    );
  };

  render() {
    const { isCorrect, description, correctAnswer, onPress, author } = this.state;
    const { navigation } = this.props;
    return (
      <ModalTemplate>
        <View style={styles.contentContainer}>
          <View
            style={[
              styles.titleContainer,
              {
                backgroundColor: isCorrect ? palette.primary : palette.wrongAnswerColor,
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

          <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={styles.descriptionContainer}>
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
                {!!author && this.renderAuthorRow()}
              </>
            )}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <Button
              title={i18n.t('quiz:continue')}
              type={isCorrect ? (description ? 'regular' : 'textButton') : 'secondary'}
              titleStyle={(isCorrect && !description && styles.buttonTitle) || undefined}
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
  linkText: {
    ...typography.description,
    textAlign: 'center',
    borderBottomWidth: 1,
  },
  icon: { height: 24, width: 24 },
  authorText: { ...typography.description, textAlign: 'center' },
  buttonContainer: {
    height: 50,
    margin: 14,
    justifyContent: 'flex-end',
  },
  row: { flexDirection: 'row', paddingVertical: 10 },
  linkRow: { flexDirection: 'row' },
  descriptionContainer: { paddingHorizontal: 15 },
  correctAnswet: {
    marginVertical: 15,
  },
  buttonTitle: {
    ...typography.description,
  },
});
