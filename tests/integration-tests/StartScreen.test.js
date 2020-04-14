// require('dotenv').config();
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

describe('Страница start-screen', function() {
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

  it('Страница открывается', function() {
    return this.browser
      .url('http://localhost:3000/start-screen')
      .pause(3000)
      .isExisting('.page_start-screen')
      .then(function(exists) {
        assert.ok(exists, 'Страницы не загрузилась')
      })
      // .assertView('Page StartScreen', 'body');
  });

  it('По клику на кнопке "Open settings" происходит переход к странице "Settings"', function() {
    return this.browser
      .url('http://localhost:3000/start-screen')
      .isExisting('.page_start-screen')
      .pause(500)
      .click('.greeting .btn-big')
      .pause(500)
      .isExisting('.page_settings')
      .then((exists) => {
        assert.ok(exists, 'Переход к настройкам не произошел');
      })
      // .assertView('settingsPage', 'body', { screenshotDelay: 10 })
  });

  it('По клику на кнопке "Settings" в Header происходит переход к странице "Settings"', function() {
    return this.browser
      .url('http://localhost:3000/start-screen')
      .isExisting('.page_start-screen')
      .pause(500)
      .click('.header .btn-small')
      .pause(500)
      .isExisting('.page_settings')
      .then((exists) => {
        assert.ok(exists, 'Переход к настройкам не произошел');
      })
    // .assertView('settingsPage', 'body', { screenshotDelay: 10 })
  });
});



