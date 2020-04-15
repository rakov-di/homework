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
});
