import { gameSettingsQuery } from './queries';
import { LocationData, GameSettings, GameSettingsMutationVariables } from './models';

const getValue = (value: any, defaultValue: any) =>
  value !== undefined ? value : defaultValue;

export const setLocationData = (
  _: any,
  { countryRegion, adminDistrict, adminDistrict2, formattedAddress }: LocationData,
  { cache }: any,
) => {
  const newLocationData = {
    countryRegion: getValue(countryRegion, ''),
    adminDistrict: getValue(adminDistrict, ''),
    adminDistrict2: getValue(adminDistrict2, ''),
    formattedAddress: getValue(formattedAddress, ''),
    __typename: 'locationData',
  };
  cache.writeData({ data: { locationData: newLocationData } });
  return newLocationData;
};

export const setGameSettings = (
  _: any,
  { isGameActive, score, answeredQuestion, isLocationChanged }: GameSettingsMutationVariables,
  { cache }: any,
) => {
  const currentGameSettings = cache.readQuery({ query: gameSettingsQuery })
    .gameSettings;
  const newGameSettings = {
    isGameActive: getValue(isGameActive, currentGameSettings.isGameActive),
    isLocationChanged: getValue(
      isLocationChanged,
      currentGameSettings.isLocationChanged,
    ),
    answeredQuestions:
      answeredQuestion === undefined
        ? currentGameSettings.answeredQuestions
        : currentGameSettings.answeredQuestions.concat(answeredQuestion),
    score:
      score === undefined
        ? currentGameSettings.score
        : currentGameSettings.score + score,
    __typename: 'gameSettings',
  };
  cache.writeData({ data: { gameSettings: newGameSettings } });
  return newGameSettings;
};
