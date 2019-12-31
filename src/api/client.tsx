import AsyncStorage from '@react-native-community/async-storage';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CachePersistor } from 'apollo-cache-persist';

import { setLocationData, setGameSettings, setGameData } from './resolvers';
import { GameSettings, LocationData, GameData } from 'api';

const cache = new InMemoryCache();

const SCHEMA_VERSION = '3';
const SCHEMA_VERSION_KEY = 'apollo-schema-version';

export const initialData = {
  data: {
    gameSettings: {
      answeredQuestions: [null],
      isGameActive: false,
      isLocationChanged: false,
      score: 0,
      __typename: 'gameSettings',
    } as GameSettings,
    locationData: {
      countryRegion: '',
      adminDistrict: '',
      adminDistrict2: '',
      formattedAddress: '',
      __typename: 'locationData',
    } as LocationData,
    gameData: {
      quizzes: [],
      __typename: 'quizzes',
    } as GameData,
  },
};

export const client = new ApolloClient({
  cache,
  resolvers: {
    Mutation: {
      setLocationData,
      setGameSettings,
      setGameData,
    },
  },
});

export const persistor = new CachePersistor({
  cache,
  // @ts-ignore will be fixed in next version
  storage: AsyncStorage,
});

async function setupApollo() {
  const currentVersion = await AsyncStorage.getItem(SCHEMA_VERSION_KEY);
  if (currentVersion === SCHEMA_VERSION) {
    await persistor.restore();
  } else {
    await persistor.purge();
    await AsyncStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION);
  }
}

setupApollo();
cache.writeData(initialData);
