import { decorate, observable } from 'mobx';
import { LocationData } from './models';

class Location {
  countryRegion = '';
  adminDistrict = '';
  adminDistrict2 = '';
  formattedAddress = '';

  setLocationData(newLocation: LocationData) {
    this.adminDistrict = newLocation.adminDistrict;
    this.countryRegion = newLocation.countryRegion;
    this.formattedAddress = newLocation.formattedAddress;
    this.adminDistrict2 = newLocation.adminDistrict2;
  }

  setCountryRegion(newRegion: string) {
    this.countryRegion = newRegion;
  }
  setFormattedAddress(formattedAddress: string) {
    this.formattedAddress = formattedAddress;
  }
  setAdminDistrict(adminDistrict: string) {
    this.adminDistrict = adminDistrict;
  }
  setAdminDistrict2(adminDistrict2: string) {
    this.adminDistrict2 = adminDistrict2;
  }
}

decorate(Location, {
  countryRegion: observable,
  adminDistrict: observable,
  adminDistrict2: observable,
  formattedAddress: observable,
});

export const locationStore = new Location();
