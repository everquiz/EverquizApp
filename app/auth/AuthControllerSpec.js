;(function () {
    'use strict';

    describe('AuthController', function () {

        describe.only('AuthController logic', function () {
            var authFactory,
                profileFactory,
                ctrl,
                $rootScope,
                $state,
                $httpBackend,
                $scope;

            // Set up the module
            beforeEach(module('everquizApp', function ($provide) {
                $provide.factory('authFactory', function ($q){
                    return {
                        register: function(user){
                            var deferred = $q.defer();
                            if (user.error) {
                                console.log('error')
                                deferred.reject('error');
                            } else {
                                console.log('success')
                                deferred.resolve();
                            };
                            return deferred.promise;
                        }

                    };
                });
                $provide.value('profileFactory', {
                    addAchievement: sinon.stub()
                })
            }));

            beforeEach(inject(function ($controller, _authFactory_, _$rootScope_, _$state_, _$httpBackend_, _profileFactory_) {
                authFactory = _authFactory_;
                profileFactory = _profileFactory_;
                $scope = _$rootScope_.$new();
                $state = _$state_;
                $httpBackend = _$httpBackend_;
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
                ctrl.register();
                $scope.$digest();
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
        })

    })
})(); 