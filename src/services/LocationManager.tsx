import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import Config from 'react-native-config';

import {AddressData} from 'api';

export default class LocationManager {
  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        async (position: GeoPosition) => {
          const {latitude, longitude} = position.coords;
          try {
            if (latitude && longitude) {
              const address: AddressData = await this.getGeocodingResults(
                latitude,
                longitude,
              );
              resolve(address);
            }
          } catch (error) {
            reject(error);
          }
        },
        error => {
          reject(error);
          // TODO send to crashlytics (error.code, error.message);
        },
        {timeout: 15000, maximumAge: 10000},
      );
    });
  }

  async getGeocodingResults(latitude: number, longitude: number) {
    const url = `http://dev.virtualearth.net/REST/v1/Locations/${latitude},${longitude}?o=json&key=${Config.BING_MAP_KEY}`;
    console.log('url', url);
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.resourceSets[0].resources[0].address;
    } catch (error) {
      // do something with crashlytics
      throw error;
    }
  }
}
