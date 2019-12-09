import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Alert,
  ScrollViewProps,
} from 'react-native';
import {graphql} from 'react-apollo';
import compose from 'lodash.flowright';
import {NavigationInjectedProps} from 'react-navigation';
import Carousel, {CarouselStatic} from 'react-native-snap-carousel';

import {
  locationDataQuery,
  gameSettingsQuery,
  setGameSettingsMutation,
  GameSettings,
  Question,
  GameSettingsResponse,
} from 'api';
import {i18n} from 'locale';
import {QuizCard, ResultCart} from 'components';
import questions from '../assets/questions';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

interface Props extends NavigationInjectedProps {
  locationDataResults: any;
  gameSettingsResults: any;
  setGameSettings: ({
    variables,
  }: {
    variables: GameSettings;
  }) => GameSettingsResponse;
}

interface State {
  questions: [];
}

class QuizScreen extends React.PureComponent<Props, State> {
  carouselRef = React.createRef<
    Carousel<any> & CarouselStatic<any> & ScrollViewProps
  >();

  state = {
    questions: [],
  } as State;

  static getDerivedStateFromProps(props: Props, state: State) {
    if (state.questions.length) {
      return null;
    }
    const {
      locationDataResults: {locationData},
      gameSettingsResults: {gameSettings},
    } = props;

    const adminDistrictBasedQuestions = questions.filter(
      question => question.reason.adminDistrict === locationData.adminDistrict,
    );
    const adminDistrict2BasedQuestions = questions.filter(
      question =>
        question.reason.adminDistrict2 === locationData.adminDistrict2,
    );
    const countryBasedQuestions = questions.filter(
      question => question.reason.countryRegion === locationData.countryRegion,
    );
    const locationBasedQuestions = [
      ...adminDistrictBasedQuestions,
      ...adminDistrict2BasedQuestions,
      ...countryBasedQuestions,
    ];

    const filteredQuestions = locationBasedQuestions.filter(question => {
      if (!gameSettings.answeredQuestions.includes(question.id)) {
        return question;
      }
    });
    const result = {type: 'result', question: 'the end'};
    const filteredQuestionsWithResult = [...filteredQuestions, result];

    return {
      questions: filteredQuestionsWithResult,
    };
  }

  componentDidMount() {
    this.props.setGameSettings({
      variables: {
        isLocationChanged: false,
      },
    });
  }

  onAnswerPressed = async (
    answer: string,
    correctAnswer: string,
    id: string,
  ) => {
    if (correctAnswer === answer) {
      const {data} = await this.props.setGameSettings({
        variables: {
          score: 1,
        },
      });
      Alert.alert(
        'You are right',
        `hureeey, your total score is ${data.setGameSettings.score}`,
        [{text: 'OK', onPress: () => this.carouselRef.current!.snapToNext()}],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        'You are wrong',
        `Meh, correct answer is ${correctAnswer}`,
        [{text: 'OK', onPress: () => this.carouselRef.current!.snapToNext()}],
        {cancelable: false},
      );
    }
    this.props.setGameSettings({
      variables: {
        answeredQuestion: id,
      },
    });
  };

  renderQuizCard = ({item}: {item: Question | Result}) => {
    if (item.type === 'result') {
      return <ResultCart question={item.question} />;
    }
    const answers = item.incorrect_answers.concat(item.correct_answer);
    return (
      <QuizCard
        question={item.question}
        answers={answers}
        onPress={(gotAnswer: string) =>
          this.onAnswerPressed(gotAnswer, item.correct_answer, item.id)
        }
      />
    );
  };

  render() {
    const {
      locationDataResults: {
        locationData: {adminDistrict2, adminDistrict, countryRegion},
      },
      gameSettingsResults,
    } = this.props;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text>
            {i18n.t('quiz:location')}
            {adminDistrict || adminDistrict2 || countryRegion}
          </Text>
          <Text>
            {i18n.t('quiz:score')} {gameSettingsResults.gameSettings.score}
          </Text>
        </View>
        <View style={styles.carouselContainer}>
          <Carousel
            ref={this.carouselRef as any}
            removeClippedSubviews={false}
            data={this.state.questions}
            renderItem={this.renderQuizCard as any}
            sliderWidth={WIDTH}
            itemWidth={WIDTH * 0.9}
            scrollEnabled={false}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
  },
  headerContainer: {
    margin: 10,
  },
  carouselContainer: {
    paddingVertical: 100,
    height: HEIGHT * 0.6,
    flexDirection: 'column',
  },
  footerContainer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  footer: {
    fontSize: 20,
  },
});

export default compose(
  graphql<any>(locationDataQuery, {
    name: 'locationDataResults',
  }),
  graphql(setGameSettingsMutation, {name: 'setGameSettings'}),
  graphql(gameSettingsQuery, {
    name: 'gameSettingsResults',
  }),
)(QuizScreen);
