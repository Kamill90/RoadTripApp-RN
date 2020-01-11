import { decorate, observable, action } from 'mobx';

import { getValue } from './resolvers';

class Store {
  gameSettings = {
    answeredQuestions: [null],
    isGameActive: false,
    isLocationChanged: false,
    score: 0,
    badges: [],
  };

  updateGameSettings = ({
    isGameActive,
    score,
    answeredQuestion,
    isLocationChanged,
    badge,
  }) => {
    this.gameSettings.isGameActive = getValue(
      isGameActive,
      this.gameSettings.isGameActive,
    );
  };
}

decorate(Store, {
  gameSettings, {
    gameSettings: observable,
    updateGameSettings: action,
  }
})

export default new Store();