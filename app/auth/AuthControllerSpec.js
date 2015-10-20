;(function () {
    'use strict';

    describe('AuthController', function () {

        describe('AuthController logic', function () {
            var authFactory,
                ctrl,
                $rootScope,
                $state;

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
                                deferred.resolve(200);
                            };
                            return deferred.promise;
                        }

                    };
                });
                $provide.value('profileFactory', {
                    addAchievement: sinon.stub()
                })
            }));

            beforeEach(inject(function ($controller, _authFactory_, _$rootScope_, _$state_) {
                authFactory = _authFactory_;
                $rootScope = _$rootScope_;
                $state = _$state_;
                ctrl = $controller('AuthController', {
                    authFactory: authFactory
                });
                sinon.stub($state, 'go');
                ctrl.dataLoaded = false;
            }));

            it('should registrate user', function () {
                ctrl.user = {};
                // ctrl.user.error = true;
                expect(ctrl.dataLoaded).to.be.false;
                ctrl.register();
                $rootScope.$apply();
                expect(ctrl.dataLoaded).to.be.true;
                expect(profileFactory.addAchievement).to.have.been.called;
            });

            it('should not registrate user', function () {
                ctrl.user = {};
                ctrl.user.error = true;
                expect(ctrl.dataLoaded).to.be.false;
                ctrl.register();
                $rootScope.$apply();
                expect(ctrl.dataLoaded).to.be.true;
                expect(profileFactory.addAchievement).to.have.been.called;
            });
        })

    })
})(); 