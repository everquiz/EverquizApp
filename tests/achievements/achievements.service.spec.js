'use strict';

describe("AchievementService", function() {
  var achievementService, $httpBackend;

  // Set up the module
  beforeEach(module('everquizApp'));

  beforeEach(inject(function (_achievementService_, _$httpBackend_) {
    achievementService = _achievementService_;
    $httpBackend = _$httpBackend_;
  }));

   beforeEach(inject(function($injector) {
      // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');

      // The $controller service is used to create instances of controllers
      var $controller = $injector.get('$controller');

      createController = function() {
        return $controller('MyController', {'$scope' : $rootScope });
      };
    }));

  it('should get achievement from the server', function () {
    // $httpBackend
    // .expectGET('/api/v1/Achievements', headers)
    // .expectPOST('/people', {
    //   name: 'Ben'
    // })
    // .respond(200);
    // var succeeded;
    // new Person('Ben').create()
    // .then(function () {
    //   succeeded = true;
    // });
    // $httpBackend.flush();
    // expect(succeeded).to.be.true;
  });
});