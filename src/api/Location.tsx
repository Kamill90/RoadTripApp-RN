import { decorate, observable, computed, action } from 'mobx';
import { LocationData } from './models';

class Location {
  _countryRegion = '';
  _adminDistrict = '';
  _adminDistrict2 = '';
  _formattedAddress = '';

  get countryRegion(): string {
    return this._countryRegion;
  }
  get adminDistrict(): string {
    return this._adminDistrict;
  }
  get adminDistrict2(): string {
    return this._adminDistrict2;
  }
  get formattedAddress(): string {
    return this._formattedAddress;
  }

  setLocationData(newLocation: LocationData) {
    this._adminDistrict = newLocation.adminDistrict;
    this._countryRegion = newLocation.countryRegion;
    this._formattedAddress = newLocation.formattedAddress;
    this._adminDistrict2 = newLocation.adminDistrict2;
  }

  reset() {
    this._countryRegion = '';
    this._adminDistrict = '';
    this._adminDistrict2 = '';
    this._formattedAddress = '';
  }
}

decorate(Location, {
  _countryRegion: observable,
  _adminDistrict: observable,
  _adminDistrict2: observable,
  _formattedAddress: observable,
  countryRegion: computed,
  adminDistrict: computed,
  adminDistrict2: computed,
  formattedAddress: computed,
  setLocationData: action,
  reset: action,
});

export const locationStore = new Location();
