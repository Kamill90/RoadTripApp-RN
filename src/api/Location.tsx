import { decorate, observable, computed, action } from 'mobx';

import { LocationData } from './models';

export const initLocation = {
  countryRegion: '',
  adminDistrict: '',
  adminDistrict2: '',
};
export class Location {
  _countryRegion = initLocation.countryRegion;

  _adminDistrict = initLocation.adminDistrict;

  _adminDistrict2 = initLocation.adminDistrict2;

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
    this._countryRegion = initLocation.countryRegion;
    this._adminDistrict = initLocation.adminDistrict;
    this._adminDistrict2 = initLocation.adminDistrict2;
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
