import gql from 'graphql-tag';

export const locationDataQuery = gql`
  query locationData {
    locationData @client {
      countryRegion
      adminDistrict
      counter
      isGameActive
    }
  }
`;
