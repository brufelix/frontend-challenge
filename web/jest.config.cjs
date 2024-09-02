module.exports = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest/presets/js-with-babel',
  moduleNameMapper: {
    'use-resize-observer': 'use-resize-observer/polyfilled',
  },
};
