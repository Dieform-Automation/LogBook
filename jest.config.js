module.exports = {
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/mocks/svgrMock.js',
  },
  rootDir: 'src',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};
