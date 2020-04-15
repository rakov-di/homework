require('dotenv').config();
const assert = require('assert');

const { api, axiosAPI } = require('../../server/externalAPI/api');

const MockAdapter = require('axios-mock-adapter');
const mock = new MockAdapter(axiosAPI);
mock.onGet('/conf').reply(200, {});

api.deleteSettings();

describe('Страница start-screen', function() {
  beforeEach(async () => {
    api.deleteSettings();

    await axiosAPI.delete(`/conf`);

    // (async () => await api.deleteSettings())();
    // (async () => await this.browser.pause(1000))();
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
    .url('start-screen')
    .waitForExist('.page_start-screen')
    .click('.header .icon_settings-before')
    .waitForExist('.page_settings')
    .then((exists) => {
      assert.ok(exists, 'Переход к настройкам не произошел');
    })
});
});



