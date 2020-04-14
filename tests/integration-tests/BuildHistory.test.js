var assert = require('assert');

describe('Page Build History', function() {


  it('Does page Build History exist - should find id', function() {
    return this.browser
      .url('http://localhost:3000/build-history')
      .pause(3000)
      .isExisting('.page_build-history')
      .then(function(exist) {
        assert.ok(exist, 'Settings page successfully opened')
      });
  });
});
