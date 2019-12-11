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
  Question,
  GameSettingsResponse,
  Result,
  GameSettingsMutationVariables,
  LocationDataResults,
  GameSettingsResults,
  LocationDataResponse,
  QUESTION_TYPE,
} from 'api';
import {i18n} from 'locale';
import {QuizCard, ResultCard, Template} from 'components';
import {typography, palette} from 'styles';
import questions from '../assets/questions';

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
}

class QuizScreen extends React.PureComponent<Props, State> {
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
      if (!gameSettings.answeredQuestions!.includes(question.id)) {
        return question;
      }
    });
    const result = {id: '0',type: 'result', question: i18n.t('quiz:resultTitle'), description: i18n.t('quiz:resultDescription')};
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
} as State;


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
    if (item.type === QUESTION_TYPE.RESULT) {
      return <ResultCard question={item.question} description={item.description} /> ;
    }
    const answers = item.incorrect_answers!.concat(item.correct_answer!);
    return (
      <QuizCard
        question={item.question}
        answers={answers}
        onPress={(gotAnswer: string) =>
          this.onAnswerPressed(gotAnswer, item.correct_answer!, item.id)
        }
      />
    );
  };

  render() {
    const {
      locationDataResults: {
        locationData: {adminDistrict2, adminDistrict, countryRegion, formattedAddress},
      },
      gameSettingsResults,
    } = this.props;
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
        <View style={styles.scoreContainer}>
          <Text style={typography.score}>
            {i18n.t('quiz:score')} {gameSettingsResults.gameSettings.score}
          </Text>
        </View>
        <View style={styles.carouselContainer}>
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
  carouselContainer: {
    paddingBottom: 100,
    flexDirection: 'column',
  },
  summary: {
    marginHorizontal: 15,
  },
  footerContainer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  footer: {
    fontSize: 20,
  },
  scoreContainer: {
    width: '80%',
    height: 50,
    backgroundColor: palette.secondaryBackground,
    borderRadius: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 100,
  }
});

export default compose(
  graphql(setGameSettingsMutation, {name: 'setGameSettings'}),
  graphql<LocationDataResponse, LocationDataResults>(locationDataQuery, {
    name: 'locationDataResults',
  }),
  graphql<GameSettingsResponse, GameSettingsResults>(gameSettingsQuery, {
    name: 'gameSettingsResults',
  }),
)(QuizScreen);
