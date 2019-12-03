import gql from 'graphql-tag';

export const locationDataQuery = gql`
  query locationData {
    locationData @client {
      countryRegion
      adminDistrict
      adminDistrict2
    }
  }
`;

export const gameSettingsQuery = gql`
  query gameSettingsData {
    gameSettings @client {
      isGameActive
      score
      answeredQuestions
    }
  }
`;
