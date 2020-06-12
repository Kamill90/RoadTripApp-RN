import Geolocation, {
  GeoPosition,
  GeoError,
} from 'react-native-geolocation-service';
import { Alert, Platform, PermissionsAndroid } from 'react-native';
import Config from 'react-native-config';
import { logToCrashlytics } from 'services';

import { AddressComponent } from 'api';

export default class LocationManager {
  async getCurrentLocation() {
    if (Platform.OS === 'android') {
      console.log(
        'PermissionsAndroid.check(Permission.ACCESS_COARSE_LOCATION',
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ),
      );
      if (
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        )
      ) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        );
      }
    }
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
            logToCrashlytics('internet connection problem');
            reject(
              'Could not connect to the internet. Please check your network connection',
            );
          }
        },
        (error: GeoError) => {
          logToCrashlytics(`GeoError: ${error.message}`);
          reject(error.message);
        },
        { timeout: 15000, enableHighAccuracy: false, maximumAge: 1500 },
      );
    });
  }

  async getGeocodingResults(latitude: number, longitude: number) {
    // eslint-disable-next-line prettier/prettier
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
      Config.GOOGLE_MAP_KEY
    }&language=en`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status !== 'OK') {
        logToCrashlytics(`FetchGoogleMapApi: ${data.toString()}`);
        return Alert.alert('Something went wrong');
      }
      const { address_components } = data.results[0];
      const filterFunction = (type: string) =>
        address_components.filter((result: AddressComponent) => {
          if (result.types[0] === type) {
            return result;
          }
        });

      const address = {
        countryRegion:
          (filterFunction('country').length &&
            filterFunction('country')[0].long_name.toLowerCase()) ||
          '',
        adminDistrict:
          (filterFunction('administrative_area_level_1').length &&
            filterFunction(
              'administrative_area_level_1',
            )[0].long_name.toLowerCase()) ||
          '',
        adminDistrict2:
          (filterFunction('administrative_area_level_2').length &&
            filterFunction(
              'administrative_area_level_2',
            )[0].long_name.toLowerCase()) ||
          '',
      };
      return address;
    } catch (error) {
      throw error;
    }
  }
}
