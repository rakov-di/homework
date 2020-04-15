module.exports = {
  baseUrl: 'http://localhost:3000',
  gridUrl: 'http://0.0.0.0:4444/wd/hub',
  sets: {
    desktop: {
      files: 'tests/integration-tests'
    },
  },
  screenshotsDir: 'tests/integration-tests/screens',

  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome' // this browser should be installed on your OS
      },
      waitTimeout: 10000,
      // retry: 3
    }
  },
  plugins: {
    'html-reporter/hermione': {
  //     // enabled: true,
      path: 'tests/hermione-reports',
  //     // defaultView: 'all',
  //     // baseHost: 'http://localhost:3000',
    },
  },
};
