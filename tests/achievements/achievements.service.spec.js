'use strict';

describe("AchievementService", function() {
    var achievementService, $httpBackend;

    // Set up the module
    beforeEach(module('everquizApp'));

    beforeEach(inject(function (_achievementService_, _$httpBackend_) {
        achievementService = _achievementService_;
        $httpBackend = _$httpBackend_;
    }));

    it('should get achievement from the server', function () {
        $httpBackend
            .expectGET('/api/v1/Achievements/', headers)
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