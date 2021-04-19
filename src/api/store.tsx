import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncTrunk } from 'mobx-sync';

import { GameData } from './GameData';
import { GameSettings } from './GameSettings';
import { Location } from './Location';

class RootStore {
  gameData: GameData;
  location: Location;
  gameSettings: GameSettings;

  constructor() {
    this.gameData = new GameData();
    this.location = new Location();
    this.gameSettings = new GameSettings();
  }
}

export const rootStore = new RootStore();

export const rootStoreTrunk = new AsyncTrunk(rootStore, {
  storage: AsyncStorage,
});

export async function clearStores() {
  await rootStoreTrunk.clear();
}
