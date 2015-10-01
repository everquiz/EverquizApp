'use strict';

describe("AchievmentService", function() {
  var achievmentService, $httpBackend;

  // Set up the module
  beforeEach(module('everquizApp'));

  beforeEach(inject(function (_achievmentService_, _$httpBackend_) {
    achievmentService = _achievmentService_;
    $httpBackend = _$httpBackend_;
  }));

  it('should get achievment from the server', function () {
    $httpBackend
    .expectGET('/api/v1/Achievments/', headers)
    .respond(200);
    var succeeded;
    new Person('Ben').create()
    .then(function () {
      succeeded = true;
    });
    $httpBackend.flush();
    expect(succeeded).to.be.true;
  });
});