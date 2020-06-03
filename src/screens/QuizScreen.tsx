import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollViewProps,
} from 'react-native';
import { inject, observer } from 'mobx-react';
import { NavigationInjectedProps } from 'react-navigation';
import Carousel, { CarouselStatic } from 'react-native-snap-carousel';

import {
  Result,
  QUESTION_TYPE,
  QuestionData,
  BADGES,
  LocationStore,
  GameSettingsStore,
  GameDataStore,
} from 'api';
import { i18n } from 'locale';
import { QuizCard, ResultCard, Template, ChallengeCard } from 'components';
import { typography, palette } from 'styles';
import { ScrollView } from 'react-native-gesture-handler';

const WIDTH = Dimensions.get('screen').width;

interface Props extends NavigationInjectedProps {
  rootStore: {
    location: LocationStore;
    gameSettings: GameSettingsStore;
    gameData: GameDataStore;
  };
}

interface State {
  questions: any[];
  answeredInSession: number;
  sessionScore: number;
  challenge: string;
}

class QuizScreen extends React.PureComponent<Props, State> {
  static getDerivedStateFromProps(props: Props, state: State) {
    if (state.questions.length) {
      return null;
    }
    const { location, gameSettings, gameData } = props.rootStore;
    const baseQuestions = gameData.quizzes.filter(
      (question: QuestionData | undefined) =>
        question!.approved && question!.language === i18n.language,
    );

    const adminDistrictBasedQuestions = baseQuestions.filter(
      (question: QuestionData | undefined) =>
        question!.reason === 'adminDistrict' &&
        question!.reasonValue.toLowerCase() === location.adminDistrict,
    );

    const adminDistrict2BasedQuestions = baseQuestions.filter(
      (question: QuestionData | undefined) =>
        question!.reason === 'adminDistrict2' &&
        question!.reasonValue.toLowerCase() === location.adminDistrict2,
    );

    const countryBasedQuestions = baseQuestions.filter(
      (question: QuestionData | undefined) =>
        question!.reason === 'countryRegion' &&
        question!.reasonValue.toLowerCase() === location.countryRegion,
    );

    const locationBasedQuestions = [
      ...adminDistrictBasedQuestions,
      ...adminDistrict2BasedQuestions,
      ...countryBasedQuestions,
    ];
    const filteredQuestions = locationBasedQuestions.filter(
      (question: QuestionData | undefined) => {
        if (!gameSettings.answeredQuestions.includes(question!.id)) {
          return question;
        }
      },
    );
    filteredQuestions.splice(20);

    const challenges = gameData.challenges
      .filter(challenge => challenge.language === i18n.language)
      .sort(() => Math.random() - 0.5);

    const firstChallenge = challenges.length && challenges[0].content;

    const result = {
      id: '0',
      type: 'result',
      question: i18n.t('quiz:resultTitle'),
      description: i18n.t('quiz:resultDescription'),
    };

    const filteredQuestionsWithResult = [...filteredQuestions, result];

    return {
      questions: filteredQuestionsWithResult,
      challenge: firstChallenge,
    };
  }

  carouselRef = React.createRef<
    Carousel<any> & CarouselStatic<any> & ScrollViewProps
  >();

  state = {
    questions: [],
    answeredInSession: 0,
    sessionScore: 0,
    challenge: '',
  } as State;

  componentDidMount() {
    this.props.rootStore.gameSettings.setIsLocationChanged(false);
  }

  showTip = ({
    isCorrect,
    correctAnswer,
    tip,
    author,
    link,
  }: {
    isCorrect: boolean;
    correctAnswer: string;
    tip?: string;
    author?: string;
    link?: string;
  }) => {
    this.props.navigation.navigate('TipCard', {
      isCorrect,
      correctAnswer,
      description: tip,
      author,
      link,
      onPress: async () => {
        this.carouselRef.current!.snapToNext();
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
        this.props.rootStore.gameSettings.setBadges(badge);
        this.props.navigation.navigate('BadgeCard', {
          badge,
        });
      }
    }
  };

  onAnswerPressed = (
    answer: string,
    correctAnswer: string,
    id: string,
    tip: string,
    author: string,
    link: string,
  ) => {
    this.props.rootStore.gameSettings.setAnsweredQuestions(id);
    if (correctAnswer === answer) {
      this.setState({ sessionScore: this.state.sessionScore + 1 });
      this.props.rootStore.gameSettings.setScore(1);
      this.showTip({ isCorrect: true, correctAnswer, tip, author, link });
    } else {
      this.showTip({ isCorrect: false, correctAnswer, tip, author, link });
    }
  };

  renderQuizCard = ({ item }: { item: QuestionData | Result }) => {
    const { challenge } = this.state;
    if (item.type === QUESTION_TYPE.RESULT) {
      return (
        <ScrollView bounces={false} showsVerticalScrollIndicator={true}>
          <ResultCard
            question={item.question}
            description={item.description || ''}
          />
          {!!challenge && <ChallengeCard content={challenge} />}
        </ScrollView>
      );
    }
    return (
      <QuizCard
        question={item.question}
        reason={item.reasonValue}
        answers={item.answers}
        onPress={(gotAnswer: string) =>
          this.onAnswerPressed(
            gotAnswer,
            item.correct_answer!,
            item.id,
            item.tip || '',
            item.author || '',
            item.link || '',
          )
        }
      />
    );
  };

  render() {
    const { gameSettings } = this.props.rootStore;
    const { questions, answeredInSession } = this.state;
    const progress =
      questions.length - 1 === 0 || answeredInSession === 0
        ? 0
        : `${(answeredInSession / (questions.length - 1)) * 100}%`;
    return (
      <Template>
        <View style={styles.mainContainer}>
          <View style={styles.scoreContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: progress,
                },
              ]}
            />
            <Text style={[typography.score, styles.scoreText]}>
              {i18n.t('quiz:score')} {gameSettings.score}
            </Text>
          </View>
          <View style={styles.carouselContainer}>
            <Carousel
              ref={this.carouselRef as any}
              removeClippedSubviews={false}
              data={this.state.questions}
              renderItem={this.renderQuizCard}
              sliderWidth={WIDTH}
              itemWidth={WIDTH}
              scrollEnabled={false}
            />
          </View>
        </View>
      </Template>
    );
  }
}

const styles = StyleSheet.create({
  summary: {
    marginHorizontal: 15,
  },
  mainContainer: {
    flex: 1,
  },
  scoreContainer: {
    height: 50,
    backgroundColor: palette.secondaryBackground,
    borderRadius: 15,
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginBottom: 15,
    marginTop: 10,
    marginHorizontal: 15,
  },
  scoreText: { alignSelf: 'center' },
  progressBar: {
    backgroundColor: palette.primary,
    position: 'absolute',
    height: '100%',
    borderRadius: 15,
  },
  carouselContainer: {
    flex: 1,
    alignSelf: 'flex-start',
    paddingTop: 20,
  },
});

// @ts-ignore
export default inject('rootStore')(observer(QuizScreen));
