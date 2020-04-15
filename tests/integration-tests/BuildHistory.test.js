var assert = require('assert');

describe('Страница build-History', function() {


  it('Страница открывается', function() {
    return this.browser
      .url('/build-history')
      .waitForExist('.page_build-history')
      .then(function(exist) {
        assert.ok(exist, 'Страницы не загрузилась')
      })
  });

  it('По клику на кнопке "Settings" в Header происходит переход к странице "Settings"', function() {
    return this.browser
      .url('build-history')
      .waitForExist('.page_build-history')
      .click('.header .icon_settings-before')
      .waitForExist('.page_settings')
      .then((exists) => {
        assert.ok(exists, 'Переход к настройкам не произошел');
      })
  });
});
