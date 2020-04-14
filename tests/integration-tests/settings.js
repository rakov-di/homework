var assert = require('assert');

describe('Page Settings', function() {
  it('Does page exist - should find title', function() {
    // this.browser.setTimeout({
    //   'implicit': 5000,
    //   'pageLoad': 5000
    // });

    return this.browser
      .url('http://localhost:3000/settings')
      .pause(3000)
      .getText('.header__title')
      .then(function(title) {
        assert.equal(title, 'School CI server')
      });
  });
});
