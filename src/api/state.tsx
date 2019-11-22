import React, {createContext, useReducer} from 'react';

export const AppContext = createContext({
  locationData: {
    countryRegion: '',
    adminDistrict: '',
    counter: 0,
    isGameActive: false,
  },
  color: 'red',
});

// export const useStateValue = () => useContext(AppContext);
