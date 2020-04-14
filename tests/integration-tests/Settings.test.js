var assert = require('assert');

describe('Page Settings', function() {
  it('Does page Settings exist - should find id', function() {
    return this.browser
      .url('http://localhost:3000/settings')
      .pause(3000)
      .isExisting('.page_settings')
      .then(function(exist) {
        assert.ok(exist, 'Settings page successfully opened')
      });
  });
});
