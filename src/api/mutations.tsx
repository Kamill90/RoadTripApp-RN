import gql from 'graphql-tag';

export const setLocationDataMutation = gql`
  mutation setLocationData(
    $countryRegion: String
    $adminDistrict: String
    $adminDistrict2: String
    $formattedAddress: String
  ) {
    setLocationData(
      countryRegion: $countryRegion
      adminDistrict: $adminDistrict
      adminDistrict2: $adminDistrict2
      formattedAddress: $formattedAddress
    ) @client
  }
`;

export const setGameSettingsMutation = gql`
  mutation setGameSettings(
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

export const setGameDataMutation = gql`
  mutation setGameData($quiz: QuestionData) {
    setGameData(quiz: $quiz) @client
  }
`;
