export class Geolocation {
  requestAuthorization = jest.fn();
  getCurrentPosition = jest.fn();
  watchPosition = jest.fn();
  clearWatch = jest.fn();
}
