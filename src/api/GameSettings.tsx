import { i18n } from 'locale';
import { decorate, observable, action, computed } from 'mobx';
import { NotificationService } from 'services';

export const initGameSettings = {
  answeredQuestions: [],
  isGameActive: false,
  isLocationChanged: false,
  score: 0,
  badges: [],
  isReminderActive: false,
  isLocationNotificationActive: true,
  locationScores: {},
};
export class GameSettings {
  private _answeredQuestions: string[] = initGameSettings.answeredQuestions;
  private _isGameActive = initGameSettings.isGameActive;
  private _isLocationChanged = initGameSettings.isLocationChanged;
  private _score = initGameSettings.score;
  private _badges: string[] = initGameSettings.badges;
  private _isReminderActive = initGameSettings.isReminderActive;
  private _isLocationNotificationActive = initGameSettings.isLocationNotificationActive;
  private _locationScores = initGameSettings.locationScores;

  get answeredQuestions(): string[] {
    return this._answeredQuestions;
  }

  setAnsweredQuestions(value: string, reasonValue: string, score: number) {
    this._answeredQuestions = this._answeredQuestions.concat(value);
    this._locationScores[reasonValue] = {
      ...this._locationScores[reasonValue],
      answeredQuestions: this._locationScores[reasonValue]?.answeredQuestions
        ? this._locationScores[reasonValue].answeredQuestions + 1
        : 1,
      score: this._locationScores[reasonValue]?.score ? this._locationScores[reasonValue].score + score : score,
    };
  }

  get locationScores(): any {
    return this._locationScores;
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

  get badges(): string[] {
    return this._badges;
  }

  setBadges(value: string) {
    this._badges = this._badges.concat(value);
  }

  get isReminderActive(): boolean {
    return this._isReminderActive;
  }

  setReminder(value: boolean) {
    if (value) {
      NotificationService.scheduledNotification(
        i18n.t('notification:staticTitle'),
        i18n.t('notification:staticMessage'),
      );
    } else {
      NotificationService.cancelNotifications();
    }
    this._isReminderActive = value;
  }

  get isLocationNotificationActive(): boolean {
    return this._isLocationNotificationActive;
  }

  setLocationNotification(value: boolean) {
    this._isLocationNotificationActive = value;
  }

  reset() {
    this._answeredQuestions = initGameSettings.answeredQuestions;
    this._isGameActive = initGameSettings.isGameActive;
    this._isLocationChanged = initGameSettings.isLocationChanged;
    this._score = initGameSettings.score;
    this._badges = initGameSettings.badges;
    this._isReminderActive = initGameSettings.isReminderActive;
    this._isLocationNotificationActive = initGameSettings.isLocationNotificationActive;
    this._locationScores = initGameSettings.locationScores;
  }
}

decorate(GameSettings, {
  // @ts-ignore
  _answeredQuestions: observable,
  _locationScores: observable,
  _isGameActive: observable,
  _isLocationChanged: observable,
  _score: observable,
  _badges: observable,
  _isReminderActive: observable,
  _isLocationNotificationActive: observable,
  locationScores: computed,
  answeredQuestions: computed,
  isGameActive: computed,
  isLocationChanged: computed,
  score: computed,
  badges: computed,
  isReminderActive: computed,
  isLocationNotificationActive: computed,
  setAnsweredQuestions: action,
  setIsLocationChanged: action,
  setIsGameActive: action,
  setScore: action,
  setBadges: action,
  setReminder: action,
  setLocationNotification: action,
  reset: action,
});
