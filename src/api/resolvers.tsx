import {locationDataQuery, gameSettingsQuery} from './queries';
import {LocationData, GameSettings} from './models';

const getValue = (value: any, defaultValue: any) =>
  value !== undefined ? value : defaultValue;

export const setLocationData = (
  _: any,
  {countryRegion, adminDistrict, adminDistrict2}: LocationData,
  {cache}: any,
) => {
  const newLocationData = {
    countryRegion: getValue(countryRegion, ''),
    adminDistrict: getValue(adminDistrict, ''),
    adminDistrict2: getValue(adminDistrict2, ''),
    __typename: 'locationData',
  };
  cache.writeData({data: {locationData: newLocationData}});
  return newLocationData;
};

export const setGameSettings = (
  _: any,
  {isGameActive, score, answeredQuestion, isLocationChanged}: GameSettings,
  {cache}: any,
) => {
  const currentGameSettings = cache.readQuery({query: gameSettingsQuery})
    .gameSettings;
  const newGameSettings = {
    isGameActive: getValue(isGameActive, currentGameSettings.isGameActive),
    isLocationChanged: getValue(
      isLocationChanged,
      currentGameSettings.isLocationChanged,
    ),
    answeredQuestions:
      answeredQuestion == undefined
        ? currentGameSettings.answeredQuestions
        : currentGameSettings.answeredQuestions.concat(answeredQuestion),
    score:
      score == undefined
        ? currentGameSettings.score
        : currentGameSettings.score + score,
    __typename: 'gameSettings',
  };
  cache.writeData({data: {gameSettings: newGameSettings}});
  return newGameSettings;
};
