export const navigationMock = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  getParam: jest.fn((param) => param),
  dismiss: jest.fn(),
};
