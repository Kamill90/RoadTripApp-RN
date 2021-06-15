import { AddressComponent, LocationData } from 'api';
import { Alert, Platform, PermissionsAndroid } from 'react-native';
import Config from 'react-native-config';
import Geolocation, { GeoPosition, GeoError } from 'react-native-geolocation-service';

import { reportError } from './FirebaseService';

export default class LocationManager {
  watchId: number | null = null;

  async permissionRequest() {
    if (Platform.OS === 'android') {
      const locationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
      if (!locationPermission) {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
      }
    } else {
      await Geolocation.requestAuthorization('always');
    }
  }

  async getCurrentLocation() {
    await this.permissionRequest();
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        async (position: GeoPosition) => {
          const { latitude, longitude } = position.coords;
          try {
            if (latitude && longitude) {
              const address = await this.getGeocodingResults(latitude, longitude);
              if (address) {
                resolve(address);
              }
            }
          } catch (error) {
            reportError(new Error('internet connection problem'));
            reject('Could not connect to the internet. Please check your network connection');
          }
        },
        (error: GeoError) => {
          reportError(new Error(`GeoError: ${error.message}`));
          reject(error.message);
        },
        { timeout: 15000, enableHighAccuracy: false, maximumAge: 1500 },
      );
    });
  }

  watchPosition(onSuccess: (address: LocationData) => void) {
    this.permissionRequest();
    const watchId = Geolocation.watchPosition(
      async (position: GeoPosition) => {
        const { latitude, longitude } = position.coords;
        try {
          if (latitude && longitude) {
            const address = await this.getGeocodingResults(latitude, longitude);
            if (address) {
              onSuccess(address);
            }
          }
        } catch (error) {
          reportError(new Error('internet connection problem'));
          Alert.alert('Could not connect to the internet. Please check your network connection');
        }
      },
      (error: GeoError) => {
        reportError(new Error(`GeoError: ${error.message}`));
        Alert.alert(error.message);
      },
      { distanceFilter: 50000, interval: 30 * 60 * 1000, forceRequestLocation: true, useSignificantChanges: true },
    );
    this.watchId = watchId;
  }

  stopWatching() {
    Geolocation.clearWatch(this.watchId!);
  }

  async getGeocodingResults(latitude: number, longitude: number) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Config.GOOGLE_MAP_KEY}&language=en`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status !== 'OK') {
        reportError(new Error(`FetchGoogleMapApi: ${data.toString()}`));
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
        countryRegion: (filterFunction('country').length && filterFunction('country')[0].long_name.toLowerCase()) || '',
        adminDistrict:
          (filterFunction('administrative_area_level_1').length &&
            filterFunction('administrative_area_level_1')[0].long_name.toLowerCase()) ||
          '',
        adminDistrict2:
          (filterFunction('administrative_area_level_2').length &&
            filterFunction('administrative_area_level_2')[0].long_name.toLowerCase()) ||
          '',
      };
      return address;
    } catch (error) {
      throw error;
    }
  }
}
