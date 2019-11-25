import AsyncStorage from '@react-native-community/async-storage';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {CachePersistor} from 'apollo-cache-persist';

import {setLocationData, setGameSettings} from './resolvers';

const cache = new InMemoryCache();

const SCHEMA_VERSION = '1';
const SCHEMA_VERSION_KEY = 'apollo-schema-version';

export const initialData = {
  data: {
    gameSettings: {
      isGameActive: false,
      score: 0,
      __typename: 'gameSettings',
    },
    locationData: {
      countryRegion: '',
      adminDistrict: '',
      adminDistrict2: '',
      counter: 0,
      isGameActive: false,
      __typename: 'locationData',
    },
  },
};

export const client = new ApolloClient({
  cache,
  resolvers: {
    Mutation: {
      setLocationData,
      setGameSettings,
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
