import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollViewProps,
} from 'react-native';
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';
import { NavigationInjectedProps } from 'react-navigation';
import Carousel, { CarouselStatic } from 'react-native-snap-carousel';

import {
  locationDataQuery,
  gameSettingsQuery,
  setGameSettingsMutation,
  GameSettingsResponse,
  Result,
  GameSettingsMutationVariables,
  LocationDataResults,
  GameSettingsResults,
  LocationDataResponse,
  QUESTION_TYPE,
  gameDataQuery,
  QuestionData,
  GameDataResults,
  BADGES,
} from 'api';
import { i18n } from 'locale';
import { QuizCard, ResultCard, Template } from 'components';
import { typography, palette } from 'styles';

const WIDTH = Dimensions.get('screen').width;

interface Props extends NavigationInjectedProps {
  locationDataResults: LocationDataResults;
  gameSettingsResults: GameSettingsResults;
  gameDataResults: GameDataResults;
  setGameSettings: ({
    variables,
  }: {
    variables: GameSettingsMutationVariables;
  }) => GameSettingsResponse;
}

interface State {
  questions: [];
  answeredInSession: number;
  sessionScore: number;
}

class QuizScreen extends React.PureComponent<Props, State> {
  static getDerivedStateFromProps(props: Props, state: State) {
    if (state.questions.length) {
      return null;
    }
    const {
      locationDataResults: { locationData },
      gameSettingsResults: { gameSettings },
      gameDataResults: { gameData },
    } = props;

    const baseQuestions = gameData.quizzes.filter(
      (question: QuestionData) =>
        question.approved && question.language === i18n.language,
    );

    const adminDistrictBasedQuestions = baseQuestions.filter(
      (question: QuestionData) =>
        question.reason === 'adminDistrict' &&
        question.reasonValue.toLowerCase() === locationData.adminDistrict,
    );
    const adminDistrict2BasedQuestions = baseQuestions.filter(
      (question: QuestionData) =>
        question.reason === 'adminDistrict2' &&
        question.reasonValue.toLowerCase() === locationData.adminDistrict2,
    );
    const countryBasedQuestions = baseQuestions.filter(
      (question: QuestionData) =>
        question.reason === 'countryRegion' &&
        question.reasonValue.toLowerCase() === locationData.countryRegion,
    );
    const locationBasedQuestions = [
      ...adminDistrictBasedQuestions,
      ...adminDistrict2BasedQuestions,
      ...countryBasedQuestions,
    ];
    const filteredQuestions = locationBasedQuestions.filter(question => {
      if (!gameSettings.answeredQuestions!.includes(question.id)) {
        return question;
      }
    });
    const result = {
      id: '0',
      type: 'result',
      question: i18n.t('quiz:resultTitle'),
      description: i18n.t('quiz:resultDescription'),
    };
    const filteredQuestionsWithResult = [...filteredQuestions, result];

    return {
      questions: filteredQuestionsWithResult,
    };
  }

  carouselRef = React.createRef<
    Carousel<any> & CarouselStatic<any> & ScrollViewProps
  >();

  state = {
    questions: [],
    answeredInSession: 0,
    sessionScore: 0,
  } as State;

  componentDidMount() {
    this.props.setGameSettings({
      variables: {
        isLocationChanged: false,
      },
    });
  }

  showTip = (isCorrect: boolean, correctAnswer: string, tip?: string) => {
    this.props.navigation.navigate('TipCard', {
      isCorrect,
      correctAnswer,
      description: tip,
      onPress: async () => {
        await this.carouselRef.current!.snapToNext();
        this.setState(
          {
            answeredInSession: this.state.answeredInSession + 1,
          },
          this.showBadge,
        );
      },
    });
  };

  showBadge = async () => {
    const { questions, answeredInSession, sessionScore } = this.state;
    const progress =
      questions.length - 1 === 0 || answeredInSession === 0
        ? 0
        : answeredInSession / (questions.length - 1);
    if (progress === 1) {
      const sessionScoreRate = sessionScore / answeredInSession;
      const badge =
        sessionScoreRate === 1
          ? BADGES.GOLD
          : sessionScoreRate > 0.7
          ? BADGES.SILVER
          : null;
      if (badge) {
        await this.props.setGameSettings({
          variables: {
            badge,
          },
        });
        this.props.navigation.navigate('BadgeCard', {
          badge,
        });
      }
    }
  };

  onAnswerPressed = async (
    answer: string,
    correctAnswer: string,
    id: string,
    tip: string,
  ) => {
    if (correctAnswer === answer) {
      this.setState({ sessionScore: this.state.sessionScore + 1 });
      await this.props.setGameSettings({
        variables: {
          score: 1,
        },
      });
      this.showTip(true, correctAnswer, tip);
    } else {
      this.showTip(false, correctAnswer, tip);
    }
    this.props.setGameSettings({
      variables: {
        answeredQuestion: id,
      },
    });
  };

  renderQuizCard = ({ item }: { item: QuestionData | Result }) => {
    if (item.type === QUESTION_TYPE.RESULT) {
      return (
        // @ts-ignore
        <ResultCard question={item.question} description={item.description} />
      );
    }
    const answers = item.incorrect_answers!.concat(item.correct_answer!);
    return (
      <QuizCard
        question={item.question}
        reason={item.reasonValue}
        answers={answers}
        onPress={(gotAnswer: string) =>
          this.onAnswerPressed(
            gotAnswer,
            item.correct_answer!,
            item.id,
            item.tip || '',
          )
        }
      />
    );
  };

  render() {
    const { gameSettingsResults } = this.props;
    const { questions, answeredInSession } = this.state;
    const progress =
      questions.length - 1 === 0 || answeredInSession === 0
        ? 0
        : `${(answeredInSession / (questions.length - 1)) * 100}%`;
    return (
      <Template>
        <View style={styles.scoreContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: progress,
              },
            ]}
          />
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <Text style={[typography.score, { alignSelf: 'center' }]}>
            {i18n.t('quiz:score')} {gameSettingsResults.gameSettings.score}
          </Text>
        </View>
        <Carousel
          ref={this.carouselRef as any}
          removeClippedSubviews={false}
          data={this.state.questions}
          renderItem={this.renderQuizCard}
          sliderWidth={WIDTH}
          itemWidth={WIDTH * 0.8}
          scrollEnabled={false}
        />
      </Template>
    );
  }
}

const styles = StyleSheet.create({
  summary: {
    marginHorizontal: 15,
  },
  scoreContainer: {
    width: '80%',
    height: 50,
    backgroundColor: palette.secondaryBackground,
    borderRadius: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  progressBar: {
    backgroundColor: palette.primary,
    position: 'absolute',
    height: '100%',
    borderRadius: 15,
  },
});

export default compose(
  graphql(setGameSettingsMutation, { name: 'setGameSettings' }),
  graphql<LocationDataResponse, LocationDataResults>(locationDataQuery, {
    name: 'locationDataResults',
  }),
  graphql<GameSettingsResponse, GameSettingsResults>(gameSettingsQuery, {
    name: 'gameSettingsResults',
  }),
  graphql(gameDataQuery, {
    name: 'gameDataResults',
  }),
)(QuizScreen);
