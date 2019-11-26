import gql from 'graphql-tag';

export const setLocationDataMutation = gql`
  mutation setLocationData(
    $countryRegion: String
    $adminDistrict: String
    $isGameActive: Boolean
  ) {
    setLocationData(
      countryRegion: $countryRegion
      adminDistrict: $adminDistrict
      isGameActive: $isGameActive
    ) @client
  }
`;

export const setGameSettingsMutation = gql`
  mutation setLocationData($isGameActive: Boolean, $score: Int) {
    setGameSettings(isGameActive: $isGameActive, score: $score) @client
  }
`;
