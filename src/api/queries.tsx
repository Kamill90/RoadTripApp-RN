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
