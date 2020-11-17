import { NotificationService } from 'services';

import { GameSettings, initGameSettings } from '../GameSettings';

jest.mock('services');
describe('GameSettings store', () => {
  const GameSettingsStore = new GameSettings();
  test('should create store with default values on init', () => {
    expect(GameSettingsStore.answeredQuestions).toEqual(initGameSettings.answeredQuestions);
    expect(GameSettingsStore.isGameActive).toEqual(initGameSettings.isGameActive);
    expect(GameSettingsStore.isLocationChanged).toEqual(initGameSettings.isLocationChanged);
    expect(GameSettingsStore.score).toEqual(initGameSettings.score);
    expect(GameSettingsStore.badges).toEqual(initGameSettings.badges);
    expect(GameSettingsStore.isReminderActive).toEqual(initGameSettings.isReminderActive);
    expect(GameSettingsStore.isLocationNotificationActive).toEqual(initGameSettings.isLocationNotificationActive);
    expect(GameSettingsStore.locationScores).toEqual(initGameSettings.locationScores);
  });
  test('should setAnsweredQuestions updates values properly', () => {
    GameSettingsStore.setAnsweredQuestions('value1', 'reasonValue1', 999);
    expect(GameSettingsStore.answeredQuestions).toEqual(['value1']);
    expect(GameSettingsStore.locationScores).toEqual({
      reasonValue1: {
        ...initGameSettings.locationScores,
        answeredQuestions: 1,
        score: 999,
      },
    });
  });
  test('should setIsLocationChanged updates values properly', () => {
    GameSettingsStore.setIsLocationChanged(true);
    expect(GameSettingsStore.isLocationChanged).toBeTruthy();
  });
  test('should setIsGameActive updates values properly', () => {
    GameSettingsStore.setIsGameActive(true);
    expect(GameSettingsStore.isGameActive).toBeTruthy();
  });
  test('should setScore updates values properly', () => {
    GameSettingsStore.setScore(2);
    GameSettingsStore.setScore(4);
    expect(GameSettingsStore.score).toEqual(6);
  });
  test('should setBadges updates values properly', () => {
    GameSettingsStore.setBadges('badge1');
    GameSettingsStore.setBadges('badge2');
    expect(GameSettingsStore.badges).toEqual(['badge1', 'badge2']);
  });
  test('should setReminder updates values properly', () => {
    const scheduledNotificationSpy = jest.spyOn(NotificationService, 'scheduledNotification');
    const cancelNotificationsSpy = jest.spyOn(NotificationService, 'cancelNotifications');

    GameSettingsStore.setReminder(true);
    expect(scheduledNotificationSpy).toBeCalled();
    expect(GameSettingsStore.isReminderActive).toBeTruthy();
    GameSettingsStore.setReminder(false);
    expect(cancelNotificationsSpy).toBeCalled();
    expect(GameSettingsStore.isReminderActive).toBeFalsy();
  });

  test('should setLocationNotification updates values properly', () => {
    GameSettingsStore.setLocationNotification(false);
    expect(GameSettingsStore.isLocationNotificationActive).toBeFalsy();
  });

  test('should have default values on reset', () => {
    GameSettingsStore.reset();
    expect(GameSettingsStore.answeredQuestions).toEqual(initGameSettings.answeredQuestions);
    expect(GameSettingsStore.isGameActive).toEqual(initGameSettings.isGameActive);
    expect(GameSettingsStore.isLocationChanged).toEqual(initGameSettings.isLocationChanged);
    expect(GameSettingsStore.score).toEqual(initGameSettings.score);
    expect(GameSettingsStore.badges).toEqual(initGameSettings.badges);
    expect(GameSettingsStore.isReminderActive).toEqual(initGameSettings.isReminderActive);
    expect(GameSettingsStore.isLocationNotificationActive).toEqual(initGameSettings.isLocationNotificationActive);
    expect(GameSettingsStore.locationScores).toEqual(initGameSettings.locationScores);
  });
});
