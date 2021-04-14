import { Result, QUESTION_TYPE, QuestionData, BADGES, LocationStore, GameSettingsStore, GameDataStore } from 'api';
import { QuizCard, ResultCard, Template, ChallengeCard } from 'components';
import { i18n } from 'locale';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollViewProps, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Carousel, { CarouselStatic } from 'react-native-snap-carousel';
import { NavigationInjectedProps } from 'react-navigation';
import { logEvent } from 'services';
import { typography, palette } from 'styles';

const WIDTH = Dimensions.get('screen').width;

const FORCED_LANGUAGE = 'pl'; // forced polish language - change when content is translated

interface Props extends NavigationInjectedProps<{ updateLocation: () => boolean }> {
  rootStore: {
    location: LocationStore;
    gameSettings: GameSettingsStore;
    gameData: GameDataStore;
  };
}

interface State {
  refreshing: boolean;
  derived: boolean;
  questions: any[];
  answeredInSession: number;
  sessionScore: number;
  challenge: string;
}

class QuizScreen extends React.Component<Props, State> {
  static getDerivedStateFromProps(props: Props, state: State) {
    if (state.derived) {
      return null;
    }

    const { location, gameSettings, gameData } = props.rootStore;
    const baseQuestions = gameData.quizzes.filter(
      (question: QuestionData | undefined) => question!.language === FORCED_LANGUAGE,
    );

    const adminDistrictBasedQuestions = baseQuestions.filter(
      (question: QuestionData | undefined) =>
        question!.reason === 'adminDistrict' && question!.reasonValue.toLowerCase() === location.adminDistrict,
    );

    const adminDistrict2BasedQuestions = baseQuestions.filter(
      (question: QuestionData | undefined) =>
        question!.reason === 'adminDistrict2' && question!.reasonValue.toLowerCase() === location.adminDistrict2,
    );

    const countryBasedQuestions = baseQuestions.filter(
      (question: QuestionData | undefined) =>
        question!.reason === 'countryRegion' && question!.reasonValue.toLowerCase() === location.countryRegion,
    );

    const locationBasedQuestions = [
      ...adminDistrictBasedQuestions,
      ...adminDistrict2BasedQuestions,
      ...countryBasedQuestions,
    ];
    const filteredQuestions = locationBasedQuestions.filter((question: QuestionData | undefined) => {
      if (!gameSettings.answeredQuestions.includes(question!.id)) {
        return question;
      }
    });
    filteredQuestions.splice(20);

    const challenges = gameData.challenges.filter((challenge) => challenge.language === FORCED_LANGUAGE);

    const firstChallenge = challenges.length && challenges[0].content;

    const result = {
      id: '0',
      type: 'result',
      question: i18n.t('quiz:resultTitle'),
      description: i18n.t('quiz:resultDescription'),
    };

    const filteredQuestionsWithResult = [...filteredQuestions, result];

    return {
      derived: true,
      questions: filteredQuestionsWithResult,
      challenge: firstChallenge,
    };
  }

  carouselRef = React.createRef<Carousel<any> & CarouselStatic<any> & ScrollViewProps>();

  state = {
    refreshing: false,
    derived: false,
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
      questions.length - 1 === 0 || answeredInSession === 0 ? 0 : answeredInSession / (questions.length - 1);
    if (progress === 1) {
      const sessionScoreRate = sessionScore / answeredInSession;
      let badge = '';
      let extraPoints = 0;
      if (sessionScoreRate === 1) {
        extraPoints = 10;
        badge = BADGES.GOLD;
      } else if (sessionScoreRate > 0.7) {
        badge = BADGES.SILVER;
        extraPoints = 5;
      }
      this.props.rootStore.gameSettings.setScore(extraPoints);
      if (badge) {
        this.props.rootStore.gameSettings.setBadges(badge);
        this.props.navigation.navigate('BadgeCard', {
          badge,
          extraPoints,
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
    reasonValue: string,
    question: string,
  ) => {
    logEvent('answer', {
      id,
      question,
      correct: correctAnswer === answer,
      answer,
    });
    logEvent(id, {
      question,
      correct: correctAnswer === answer,
      answer,
    });
    if (correctAnswer === answer) {
      this.props.rootStore.gameSettings.setAnsweredQuestions(id, reasonValue, 1);
      this.setState({ sessionScore: this.state.sessionScore + 1 });
      this.props.rootStore.gameSettings.setScore(1);
      this.showTip({
        isCorrect: true,
        correctAnswer,
        tip,
        author,
        link,
      });
    } else {
      this.props.rootStore.gameSettings.setAnsweredQuestions(id, reasonValue, 0);
      this.showTip({
        isCorrect: false,
        correctAnswer,
        tip,
        author,
        link,
      });
    }
  };

  refresh = () => {
    this.setState({
      refreshing: true,
      derived: false,
    });
    const updateLocation = this.props.navigation.getParam('updateLocation');
    updateLocation();
    this.setState(
      {
        answeredInSession: 0,
        sessionScore: 0,
        refreshing: false,
      },
      () => {
        this.carouselRef.current!.snapToItem(0, false);
      },
    );
  };

  renderQuizCard = ({ item }: { item: QuestionData | Result }) => {
    const { challenge, refreshing } = this.state;
    if (item.type === QUESTION_TYPE.RESULT) {
      return (
        <ScrollView
          key={`Result-${item.id}`}
          showsVerticalScrollIndicator
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={this.refresh} tintColor={palette.mainBlack} />
          }
        >
          <ResultCard question={item.question} description={item.description || ''} />
          {!!challenge && <ChallengeCard content={challenge} />}
        </ScrollView>
      );
    }
    return (
      <QuizCard
        key={item.id.toString()}
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
            item.reasonValue,
            item.question,
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
