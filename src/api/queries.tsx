import gql from 'graphql-tag';

export const locationDataQuery = gql`
  query locationData {
    locationData @client {
      countryRegion
      adminDistrict
      adminDistrict2
      formattedAddress
    }
  }
`;

export const gameSettingsQuery = gql`
  query gameSettingsData {
    gameSettings @client {
      isGameActive
      isLocationChanged
      score
      answeredQuestions
    }
  }
`;

export const gameDataQuery = gql`
  query gameData {
    gameData @client {
      quizzes {
        id
        approved
        correct_answer
        incorrect_answers
        language
        question
        reason
        reasonValue
        tip
        type
      }
    }
  }
`;
