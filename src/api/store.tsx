import { AsyncTrunk } from 'mobx-sync';
import { AsyncStorage } from 'react-native';

import { gameSettingsStore, locationStore, gameDataStore } from 'api';

export const gameSettingsTrunk = new AsyncTrunk(gameSettingsStore, {
  storage: AsyncStorage,
});
export const locationTrunk = new AsyncTrunk(locationStore, {
  storage: AsyncStorage,
});
export const gameDataTrunk = new AsyncTrunk(gameDataStore, {
  storage: AsyncStorage,
});

export async function clearStores() {
  await gameSettingsTrunk.clear();
  await locationTrunk.clear();
  await gameDataTrunk.clear();
}
