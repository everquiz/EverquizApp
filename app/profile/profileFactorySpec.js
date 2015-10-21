'use strict';

describe('Profile Factory', function() {
    var profileFactory;
    var $httpBackend;
    var authFactory;
    var response;
    var alertify;
    var $q;
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
        $provide.value('achievementService', {
                get: function () {
                    return 1;
                }
            }
        );
    }));

    beforeEach(inject(function ( _profileFactory_, _authFactory_, _$httpBackend_, _achievementService_, _$q_, _alertify_) {
        profileFactory = _profileFactory_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
        achievementService = _achievementService_;
        authFactory = _authFactory_;
        alertify = _alertify_;
        profileFactory.getLastActions = sinon.stub();
        response = [{
            id: 1,
            history: [],
            achievements: [],
            averageResult: 0,
            quizCompleted: 0,
            lastActions: []
        }];
    }));

    it('should be able to get profile', function() {
        expect(profileFactory.getProfile).not.to.be.undefined;
        expect(profileFactory.getProfile()).deep.equal({});
    });

    it('should be able to update profile', function() {
        expect(profileFactory.updateProfile).not.to.be.undefined;
        $httpBackend.when('GET','/api/v1/Users/1?populate=history,achievements').respond(response[0]);
        $httpBackend.when('GET', '/api/v1/Notes?user=1&sort=-createdAt&limit=3').respond([]);
        $httpBackend.when('GET', '/api/v1/Histories?populate=quiz&user=1&sort=-createdAt&limit=3').respond([]);
        profileFactory.updateProfile();
        $httpBackend.flush();

        var profile = profileFactory.getProfile();
        console.log(profile);
        expect(profile).deep.equal(response[0]);

    });

    it('should be able to get last three notes', function() {
        expect(profileFactory.getLastThreeNotes).not.to.be.undefined;
        $httpBackend.when('GET', '/api/v1/Notes?user=1&sort=-createdAt&limit=3').respond([]);

        profileFactory.getLastThreeNotes();
        $httpBackend.flush();
    });

    it('should be able to get last three histories', function() {
        expect(profileFactory.getLastThreeHistory).not.to.be.undefined;
        $httpBackend.when('GET', '/api/v1/Histories?populate=quiz&user=1&sort=-createdAt&limit=3').respond([]);

        profileFactory.getLastThreeHistory();
        $httpBackend.flush();
    });

    it('should be able to get quiz statistic', function() {
        expect(profileFactory.getQuizStatistic).not.to.be.undefined;

        var history = [];
        profileFactory.getQuizStatistic(history);

        expect(profileFactory.getQuizStatistic(history)).deep.equal({averageResult: 0, quizCompleted: 0});

        history = [{
            createdAt: new Date(),
            result: 5
        }];
        expect(profileFactory.getQuizStatistic(history)).deep.equal({averageResult: '500%', quizCompleted: 1});
    });

    it('should be able to manipulate profile', function() {
        profileFactory.hideProfile();
        expect(profileFactory.isVisible()).to.be.false;

        profileFactory.showProfile();
        expect(profileFactory.isVisible()).to.be.true;

        profileFactory.toggleProfile();
        expect(profileFactory.isVisible()).to.be.false;
    });

    it('should be able to add achievment', function() {
        expect(profileFactory.addAchievement).not.to.be.undefined;
        $httpBackend.when('GET', '/api/v1/Users/1').respond([]);
        $httpBackend.when('POST', '/api/v1/Users/1').respond([]);
        profileFactory.addAchievement();
    });
})
