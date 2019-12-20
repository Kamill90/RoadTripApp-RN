import Geolocation, {
  GeoPosition,
  GeoError,
} from 'react-native-geolocation-service';
import { Alert } from 'react-native';
import Config from 'react-native-config';

import { AddressComponent } from 'api';

export default class LocationManager {
  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        async (position: GeoPosition) => {
          const { latitude, longitude } = position.coords;
          try {
            if (latitude && longitude) {
              const address = await this.getGeocodingResults(
                latitude,
                longitude,
              );
              if (address) {
                resolve(address);
              }
            }
          } catch (error) {
            // throw error;
            reject(
              'Could not connect to the internet. Please check your network connection',
            );
          }
        },
        (error: GeoError) => {
          reject(error.message);
          // TODO send to crashlytics (error.code, error.message);
        },
        { timeout: 15000, maximumAge: 10000, enableHighAccuracy: false },
      );
    });
  }

  async getGeocodingResults(latitude: number, longitude: number) {
    // eslint-disable-next-line prettier/prettier
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Config.GOOGLE_MAP_KEY}&language=en`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status !== 'OK') {
        return Alert.alert('Somethinggg went wrong');
      }
      const { address_components, formatted_address } = data.results[0];

      const filterFunction = (type: string) =>
        address_components.filter((result: AddressComponent) => {
          if (result.types[0] === type) {
            return result;
          }
        });

      const address = {
        countryRegion:
          (filterFunction('country').length &&
            filterFunction('country')[0].long_name) ||
          '',
        adminDistrict:
          (filterFunction('administrative_area_level_1').length &&
            filterFunction('administrative_area_level_1')[0].long_name) ||
          '',
        adminDistrict2:
          (filterFunction('administrative_area_level_2').length &&
            filterFunction('administrative_area_level_2')[0].long_name) ||
          '',
        formattedAddress: formatted_address,
      };
      return address;
    } catch (error) {
      // do something with crashlytics
      throw error;
    }
  }
}
