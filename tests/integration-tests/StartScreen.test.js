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

  it('Страница открывается', function() {
    return this.browser
      .url('/start-screen')
      .waitForExist('.page_start-screen')
      .then(function(exists) {
        assert.ok(exists, 'Страницы не загрузилась')
      })
  });

  it('По клику на кнопке "Open settings" происходит переход к странице "settings"', function() {
    return this.browser
      .url('/start-screen')
      .waitForExist('.page_start-screen')
      .click('.greeting .btn-big')
      .waitForExist('.page_settings')
      .then((exists) => {
        assert.ok(exists, 'Переход к настройкам не произошел');
      })
  });

  it('По клику на кнопке "Settings" в Header происходит переход к странице "Settings"', function() {
    return this.browser
      .url('/start-screen')
      .waitForExist('.page_start-screen')
      .click('.header .btn-small')
      .waitForExist('.page_settings')
      .then((exists) => {
        assert.ok(exists, 'Переход к настройкам не произошел');
      })
  });
});



