import { decorate, observable, computed, action } from 'mobx';

import { LocationData } from './models';

export class Location {
  _countryRegion = '';

  _adminDistrict = '';

  _adminDistrict2 = '';

  get countryRegion(): string {
    return this._countryRegion;
  }

  get adminDistrict(): string {
    return this._adminDistrict;
  }

  get adminDistrict2(): string {
    return this._adminDistrict2;
  }

  setLocationData(newLocation: LocationData) {
    this._adminDistrict = newLocation.adminDistrict;
    this._countryRegion = newLocation.countryRegion;
    this._adminDistrict2 = newLocation.adminDistrict2;
  }

  reset() {
    this._countryRegion = '';
    this._adminDistrict = '';
    this._adminDistrict2 = '';
  }
}

decorate(Location, {
  _countryRegion: observable,
  _adminDistrict: observable,
  _adminDistrict2: observable,
  countryRegion: computed,
  adminDistrict: computed,
  adminDistrict2: computed,
  setLocationData: action,
  reset: action,
});
