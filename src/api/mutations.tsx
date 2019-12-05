import gql from 'graphql-tag';

export const setLocationDataMutation = gql`
  mutation setLocationData(
    $countryRegion: String
    $adminDistrict: String
    $adminDistrict2: String
  ) {
    setLocationData(
      countryRegion: $countryRegion
      adminDistrict: $adminDistrict
      adminDistrict2: $adminDistrict2
    ) @client
  }
`;

export const setGameSettingsMutation = gql`
  mutation setLocationData(
    $isGameActive: Boolean
    $isLocationChanged: isLocationChanged
    $score: Int
    $answeredQuestion: String
  ) {
    setGameSettings(
      isGameActive: $isGameActive
      isLocationChanged: $isLocationChanged
      score: $score
      answeredQuestion: $answeredQuestion
    ) @client
  }
`;
