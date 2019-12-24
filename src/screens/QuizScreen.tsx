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
  Question,
  GameSettingsResponse,
  Result,
  GameSettingsMutationVariables,
  LocationDataResults,
  GameSettingsResults,
  LocationDataResponse,
  QUESTION_TYPE,
} from 'api';
import { i18n } from 'locale';
import { QuizCard, ResultCard, Template } from 'components';
import { typography, palette } from 'styles';

import pl_questions from '../assets/pl_questions';
import en_questions from '../assets/en_questions';

const baseQuestions = i18n.language === 'pl' ? pl_questions : en_questions;
const WIDTH = Dimensions.get('screen').width;

interface Props extends NavigationInjectedProps {
  locationDataResults: LocationDataResults;
  gameSettingsResults: GameSettingsResults;
  setGameSettings: ({
    variables,
  }: {
    variables: GameSettingsMutationVariables;
  }) => GameSettingsResponse;
}

interface State {
  questions: [];
  answeredInSession: number;
}

class QuizScreen extends React.PureComponent<Props, State> {
  static getDerivedStateFromProps(props: Props, state: State) {
    if (state.questions.length) {
      return null;
    }
    const {
      locationDataResults: { locationData },
      gameSettingsResults: { gameSettings },
    } = props;

    const adminDistrictBasedQuestions = baseQuestions.filter(
      question => question.reason.adminDistrict === locationData.adminDistrict,
    );
    const adminDistrict2BasedQuestions = baseQuestions.filter(
      question =>
        question.reason.adminDistrict2 === locationData.adminDistrict2,
    );
    const countryBasedQuestions = baseQuestions.filter(
      question => question.reason.countryRegion === locationData.countryRegion,
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
        this.setState({
          answeredInSession: this.state.answeredInSession + 1,
        });
      },
    });
  };

  onAnswerPressed = async (
    answer: string,
    correctAnswer: string,
    id: string,
    tip: string,
  ) => {
    if (correctAnswer === answer) {
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

  renderQuizCard = ({ item }: { item: Question | Result }) => {
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
    const {
      locationDataResults: {
        locationData: {
          adminDistrict2,
          adminDistrict,
          countryRegion,
          formattedAddress,
        },
      },
      gameSettingsResults,
    } = this.props;
    const { questions, answeredInSession } = this.state;
    const progress =
      questions.length - 1 === 0 || answeredInSession === 0
        ? 0
        : `${(answeredInSession / (questions.length - 1)) * 100}%`;
    return (
      <Template>
        <View style={styles.summary}>
          <Text style={typography.basicInfo}>
            {i18n.t('quiz:location')}
            {adminDistrict || adminDistrict2 || countryRegion}
          </Text>
          <Text style={typography.secondaryInfo}>
            {`Address: ${formattedAddress}`}
          </Text>
        </View>
        <View style={styles.carouselContainer}>
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
        </View>
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
  carouselContainer: { marginBottom: 20 },
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
)(QuizScreen);
