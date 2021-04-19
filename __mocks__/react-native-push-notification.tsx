const PushNotification = {
  configure: jest.fn(),
  onRegister: jest.fn(),
  onNotification: jest.fn(),
  addEventListener: jest.fn(),
  requestPermissions: jest.fn(() => Promise.resolve()),
  getInitialNotification: jest.fn(() => Promise.resolve()),
  localNotificationSchedule: jest.fn(),
  cancelAllLocalNotifications: jest.fn(),
  scheduledNotification: jest.fn(),
};

export default PushNotification;
