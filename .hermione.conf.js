module.exports = {
  sets: {
    desktop: {
      files: 'tests/integration-tests'
    },
  },
  // screenshotsDir: 'tests/integration-tests/screens',

  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome' // this browser should be installed on your OS
      },
      waitTimeout: 10000,
      // retry: 3
    }
  }
};
