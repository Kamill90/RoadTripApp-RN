import { decorate, observable, action, computed } from 'mobx';

export class GameSettings {
  private _answeredQuestions = [];
  private _isGameActive = false;
  private _isLocationChanged = false;
  private _score = 0;
  private _badges = [];

  get answeredQuestions(): string[] | undefined[] {
    return this._answeredQuestions;
  }

  setAnsweredQuestions(value: string) {
    this._answeredQuestions = this._answeredQuestions.concat(value);
  }

  get isLocationChanged(): boolean {
    return this._isLocationChanged;
  }

  setIsLocationChanged(value: boolean) {
    this._isLocationChanged = value;
  }

  get isGameActive(): boolean {
    return this._isGameActive;
  }

  setIsGameActive(value: boolean) {
    this._isGameActive = value;
  }

  get score(): number {
    return this._score;
  }

  setScore(value: number) {
    this._score += value;
  }

  get badges(): string[] | undefined[] {
    return this._badges;
  }

  setBadges(value: string) {
    this._badges = this._badges.concat(value);
  }

  reset() {
    this._answeredQuestions = [];
    this._isGameActive = false;
    this._isLocationChanged = false;
    this._score = 0;
    this._badges = [];
  }
}

decorate(GameSettings, {
  _answeredQuestions: observable,
  _isGameActive: observable,
  _isLocationChanged: observable,
  _score: observable,
  _badges: observable,
  answeredQuestions: computed,
  isGameActive: computed,
  isLocationChanged: computed,
  score: computed,
  badges: computed,
  setAnsweredQuestions: action,
  setIsLocationChanged: action,
  setIsGameActive: action,
  setScore: action,
  setBadges: action,
  reset: action,
});
