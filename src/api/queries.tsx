import gql from 'graphql-tag';

export const locationDataQuery = gql`
  query locationData {
    locationData @client {
      countryRegion
      adminDistrict
      adminDistrict2
      counter
      isGameActive
    }
  }
`;

export const gameSettingsQuery = gql`
  query gameSettingsData {
    gameSettings @client {
      isGameActive
      score
    }
  }
`;
