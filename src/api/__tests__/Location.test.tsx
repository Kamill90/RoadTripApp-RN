import { Location, initLocation } from '../Location';

describe('Location store', () => {
  const locationStore = new Location();
  test('should create store with default values on init', () => {
    expect(locationStore._adminDistrict).toEqual(initLocation.adminDistrict);
    expect(locationStore._countryRegion).toEqual(initLocation.countryRegion);
    expect(locationStore._adminDistrict2).toEqual(initLocation.adminDistrict2);
  });
  test('should update values properly', () => {
    const newLocation = {
      countryRegion: 'a',
      adminDistrict: 'b',
      adminDistrict2: 'c',
    };
    locationStore.setLocationData(newLocation);
    expect(locationStore.adminDistrict).toEqual(newLocation.adminDistrict);
    expect(locationStore.countryRegion).toEqual(newLocation.countryRegion);
    expect(locationStore.adminDistrict2).toEqual(newLocation.adminDistrict2);
  });
  test('should have default values on reset', () => {
    const newLocation = {
      countryRegion: 'a',
      adminDistrict: 'b',
      adminDistrict2: 'c',
    };
    locationStore.setLocationData(newLocation);
    expect(locationStore.adminDistrict).not.toEqual(initLocation.adminDistrict);
    expect(locationStore.countryRegion).not.toEqual(initLocation.countryRegion);
    expect(locationStore.adminDistrict2).not.toEqual(initLocation.adminDistrict2);

    locationStore.reset();
    expect(locationStore.adminDistrict).toEqual(initLocation.adminDistrict);
    expect(locationStore.countryRegion).toEqual(initLocation.countryRegion);
    expect(locationStore.adminDistrict2).toEqual(initLocation.adminDistrict2);
  });
});
