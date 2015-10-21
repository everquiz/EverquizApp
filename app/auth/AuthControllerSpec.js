;(function () {
    'use strict';

    describe('AuthController', function () {

        describe('AuthController logic', function () {
            var authFactory,
                profileFactory,
                ctrl,
                $rootScope,
                $state,
                $httpBackend,
                $scope,
                $window,
                token;

            // Set up the module
            beforeEach(module('everquizApp', function ($provide) {
                $provide.factory('authFactory', function ($q){
                    return {
                        register: function(user) {
                            var deferred = $q.defer();
                            if (user.error) {
                                deferred.reject('error');
                            } else {
                                deferred.resolve('success');
                            };
                            return deferred.promise;
                        },
                        logIn: function(user) {
                            var deferred = $q.defer();
                            if (user.error) {
                                deferred.reject('error');
                            } else {
                                deferred.resolve('success');
                            };
                            return deferred.promise;
                        },
                        getToken: function () {
                            return token;
                        }
                    };
                });
                $provide.value('profileFactory', {
                    addAchievement: sinon.stub()
                })
            }));

            beforeEach(inject(function ($controller, _authFactory_, _$rootScope_, _$state_, _$httpBackend_, _profileFactory_, _$window_) {
                authFactory = _authFactory_;
                profileFactory = _profileFactory_;
                $scope = _$rootScope_.$new();
                $state = _$state_;
                $httpBackend = _$httpBackend_;
                $window = _$window_;
                ctrl = $controller('AuthController', {
                    $scope: $scope,
                    authFactory: authFactory
                });
                sinon.stub($state, 'go');
                ctrl.dataLoaded = false;
            }));

            it('should registrate user', function () {
                ctrl.user = {};
                expect(ctrl.dataLoaded).to.be.false;
                $scope.$digest(ctrl.register());
                expect(ctrl.dataLoaded).to.be.true;
                expect(profileFactory.addAchievement).to.have.been.called;

            });

            it('should not registrate user', function () {
                ctrl.user = {};
                ctrl.user.error = true;
                expect(ctrl.dataLoaded).to.be.false;
                $scope.$digest(ctrl.register());
                expect(ctrl.dataLoaded).to.be.true;
                expect(profileFactory.addAchievement).not.to.have.been.called;
            });

            it('should login admin', function () {
                ctrl.user = {};
                expect(ctrl.dataLoaded).to.be.false;
                token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWY5ODA1MzNlOTc1YzRhMWJmZGNlYzgiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGVzIjpbImFkbWluIl0sImV4cCI6MTQ0OTM2MTU4NSwiaWF0IjoxNDQ0MTczOTg1fQ.YFXdF2Sntu8wT6JL7i8Jp8yovZyVHoCWtpNPSlBsCdk';
                $scope.$digest(ctrl.logIn());
                expect($state.go).to.have.been.calledWith('admin.quizzes');
                expect(ctrl.dataLoaded).to.be.true;
            });

            it('should login user', function () {
                ctrl.user = {};
                expect(ctrl.dataLoaded).to.be.false;
                token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjI2NmM0OGYzZTliZDU4MTEzYTk1NjMiLCJlbWFpbCI6InZ2dnZAdnZ2diIsInJvbGVzIjpbInVzZXIiXSwiZXhwIjoxNDUwNTcwNjcwLCJpYXQiOjE0NDUzODMwNzB9.YuPX8GD_OPxmmqLdsyU8JOos4GMakVj0Z5kX2AsGtBc';
                $scope.$digest(ctrl.logIn());
                expect($state.go).to.have.been.calledWith('home');
                expect(ctrl.dataLoaded).to.be.true;
            });
            it('should not login user', function () {
                ctrl.user = {};
                ctrl.user.error = true;
                expect(ctrl.dataLoaded).to.be.false;
                $scope.$digest(ctrl.logIn());
                expect(ctrl.dataLoaded).to.be.true;
            });
        })

    })
})(); 