'use strict';

describe('Profile Factory', function() {
    var $httpBackend;
    var authFactory;
    var response;
    var alertify;
    var achievementService;

    beforeEach(module('everquizApp', function ($provide) {
        $provide.value('authFactory', {
                currentUserId: function () {
                    return 1;
                },
                isLoggedIn: function () {
                    return true;
                }
            }
        );
    }));

    beforeEach(inject(function (_notesService_, _authFactory_, _$httpBackend_, _achievementService_) {
        $httpBackend = _$httpBackend_;
        achievementService = _achievementService_;
        authFactory = _authFactory_;
        response = [];
    }));
})
