var assert = require('assert');

const testData = {
  buildId: 'c19b94a6-e025-44b0-b2a0-bafac2d782a0'
};

describe('Page Build Details', function() {
  it('Does page Build History exist - should find id', function() {
    return this.browser
      .url(`http://localhost:3000/build/${testData.buildId}`)
      .pause(3000)
      .isExisting('.page_build-details')
      .then(function(exist) {
        assert.ok(exist, 'Settings page successfully opened')
      });
  });
});
