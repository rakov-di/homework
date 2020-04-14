const assert = require('assert');

const { api, axiosAPI } = require('../../server/externalAPI/api');
const controllers = require('../../server/controllers/controllers');

// (async () => await api.deleteSettings())();
// (async () => await axiosAPI.delete(`/conf`))();
// it('Если настройки не заданы, по корневому адресу должна открываться Start Page', function() {
//   return this.browser
//     .url('/')
//     .pause(1000)
//     .waitForExist('#startPage')
//     .then((exists) => {
//       assert.ok(exists, 'Стартовая страница не открылась');
//     })
//     .assertView('startPage', 'body', { screenshotDelay: 10 })
// })

describe('Page StartScreen', function() {
  beforeEach(async () => {
    (async () => await api.deleteSettings())();
    (async () => await this.browser.pause(1000))();
  });
  // afterEach(() => {
  //   (async () => await api.updateSettings({
  //     repoName: "rakov-di/homework_async",
  //     buildCommand: "npm run build_prod",
  //     mainBranch: "master",
  //     period: 100
  //   }))();
  //   (async () => await this.browser.pause(1000))();
  // });

  it('Does page StartScreen exist - should find id', function() {
    return this.browser
      .url('http://localhost:3000/start-screen')
      .pause(3000)
      .isExisting('.page_start-screen')
      .then(function(exist) {
        assert.ok(exist, 'Start-screen page successfully opened')
      })
      // .assertView('Page StartScreen', 'body', { screenshotDelay: 10 });
  });
});



