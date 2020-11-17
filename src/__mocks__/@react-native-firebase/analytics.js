export default {
  analytics: jest.fn(() => ({
    setAnalyticsCollectionEnabled: jest.fn(),
    setCurrentScreen: jest.fn(),
    logEvent: jest.fn(),
    setUserId: jest.fn(),
  })),
};
