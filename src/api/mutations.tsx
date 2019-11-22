import gql from 'graphql-tag';

export const setLocationDataMutation = gql`
  mutation setLocationData(
    $countryRegion: String
    $adminDistrict: String
    $counter: Int
    $isGameActive: Boolean
  ) {
    setLocationData(
      countryRegion: $countryRegion
      adminDistrict: $adminDistrict
      counter: $counter
      isGameActive: $isGameActive
    ) @client
  }
`;
