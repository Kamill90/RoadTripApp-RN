import { decorate, observable, action, computed } from 'mobx';
import BackgroundFetch from 'react-native-background-fetch';
import { NotificationService } from 'services';
import { i18n } from 'locale';
export class GameSettings {
  private _answeredQuestions = [''];
  private _isGameActive = false;
  private _isLocationChanged = false;
  private _score = 0;
  private _badges = [''];
  private _isReminderActive = true;
  private _isLocationNotificationActive = true;

  get answeredQuestions(): string[] {
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
    if (value) {
      BackgroundFetch.start();
    } else {
      BackgroundFetch.stop();
    }
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
    if (value) {
      BackgroundFetch.start();
    } else {
      BackgroundFetch.stop();
    }
    this._isLocationNotificationActive = value;
  }

  reset() {
    this._answeredQuestions = [''];
    this._isGameActive = false;
    this._isLocationChanged = false;
    this._score = 0;
    this._badges = [];
    this._isReminderActive = true;
    this._isLocationNotificationActive = true;
  }
}

decorate(GameSettings, {
  _answeredQuestions: observable,
  _isGameActive: observable,
  _isLocationChanged: observable,
  _score: observable,
  _badges: observable,
  _isReminderActive: observable,
  _isLocationNotificationActive: observable,
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
