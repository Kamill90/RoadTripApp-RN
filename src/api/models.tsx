export interface LocationData {
  countryRegion?: string;
  adminDistrict?: string;
  counter?: Number;
  isGameActive?: boolean;
}

export interface AddressData {
  addressLine: string;
  adminDistrict: string;
  adminDistrict2: string;
  countryRegion: string;
  formattedAddress: string;
  locality: string;
  postalCode: string;
}
