// похоже на костыль, но пока так
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../server/.env')});

const assert = require('assert');
const { api } = require('../../server/externalAPI/api');

describe('Страница start-screen', function() {
  beforeEach(async () => {
    await api.deleteSettings();
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



