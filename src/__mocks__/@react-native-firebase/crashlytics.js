export default {
  crashlytics: jest.fn(() => ({
    crash: jest.fn(),
    setUserEmail: jest.fn(),
  })),
};
