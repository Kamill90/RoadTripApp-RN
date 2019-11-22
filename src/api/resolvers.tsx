import {locationDataQuery} from './queries';
import {LocationData} from './models';

const getValue = (value: any, defaultValue: any) =>
  value !== undefined ? value : defaultValue;

export const setLocationData = (
  _: any,
  {countryRegion, adminDistrict, counter, isGameActive}: any,
  {cache}: any,
) => {
  const currentLocationData = cache.readQuery({query: locationDataQuery})
    .locationData;

  const newLocationData = {
    countryRegion: getValue(countryRegion, currentLocationData.countryRegion),
    adminDistrict: getValue(adminDistrict, currentLocationData.adminDistrict),
    counter: getValue(counter, currentLocationData.counter),
    isGameActive: getValue(isGameActive, currentLocationData.isGameActive),
    __typename: 'locationData',
  };
  cache.writeData({data: {locationData: newLocationData}});
  return newLocationData;
};
