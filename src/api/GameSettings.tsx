import { decorate, observable, action } from 'mobx';

class GameSettings {
  answeredQuestions = [''];
  isGameActive = false;
  isLocationChanged = false;
  score = 0;
  badges = [''];

  setAnsweredQuestions(question: string) {
    this.answeredQuestions.push(question);
  }

  activateGame() {
    this.isGameActive = true;
  }

  deactivateGame() {
    this.isGameActive = false;
  }

  setIsLocationChanged(change: boolean) {
    this.isLocationChanged = change;
  }

  setScore(newScore: number) {
    this.score += newScore;
  }

  setBadges(badge: string) {
    this.badges.push(badge);
  }
}

decorate(GameSettings, {
  answeredQuestions: observable,
  isGameActive: observable,
  isLocationChanged: observable,
  score: observable,
  badges: observable,
  activateGame: action.bound,
  deactivateGame: action.bound,
  setScore: action.bound,
});

export const gameSettingsStore = new GameSettings();
