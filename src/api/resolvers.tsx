import {locationDataQuery, gameSettingsQuery} from './queries';
import {LocationData} from './models';

const getValue = (value: any, defaultValue: any) =>
  value !== undefined ? value : defaultValue;

export const setLocationData = (
  _: any,
  {countryRegion, adminDistrict, adminDistrict2, counter, isGameActive}: any,
  {cache}: any,
) => {
  const currentLocationData = cache.readQuery({query: locationDataQuery})
    .locationData;

  const newLocationData = {
    countryRegion: getValue(countryRegion, currentLocationData.countryRegion),
    adminDistrict: getValue(adminDistrict, currentLocationData.adminDistrict),
    adminDistrict2: getValue(
      adminDistrict2,
      currentLocationData.adminDistrict2,
    ),
    counter: getValue(counter, currentLocationData.counter),
    isGameActive: getValue(isGameActive, currentLocationData.isGameActive),
    __typename: 'locationData',
  };
  cache.writeData({data: {locationData: newLocationData}});
  return newLocationData;
};

export const setGameSettings = (
  _: any,
  {isGameActive, score}: any,
  {cache}: any,
) => {
  const currentGameSettings = cache.readQuery({query: gameSettingsQuery})
    .gameSettings;
  const newGameSettings = {
    isGameActive: getValue(isGameActive, currentGameSettings.isGameActive),
    score: getValue(score, currentGameSettings.score),
    __typename: 'gameSettings',
  };
  cache.writeData({data: {gameSettings: newGameSettings}});
  return newGameSettings;
};
