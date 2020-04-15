var assert = require('assert');

const testData = {
  buildId: '7bdd0bc2-1be7-466b-adbf-8c5cc9d6fa48'
};

describe('Страница build/:id', function() {
  it('Страница открывается', function() {
    return this.browser
      .url(`/build/${testData.buildId}`)
      .waitForExist('.page_build-details')
      .then(function(exist) {
        assert.ok(exist, 'Страницы не загрузилась')
      })
  });
});
