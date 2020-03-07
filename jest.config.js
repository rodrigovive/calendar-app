const path = require('path');

module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
  },
  moduleDirectories: ['node_modules', path.join(__dirname, 'test')],
  setupFilesAfterEnv: ['./test/setup-tests.ts'],
};
