;(function () {
    'use strict';

    describe('AuthController', function () {

        describe.only('AuthController logic', function () {
            var authFactory,
                ctrl;

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
                                deferred.resolve('success');
                            };
                            return deferred.promise;
                        }

                    };
                });
            }));

            beforeEach(inject(function ($controller, _authFactory_) {
                authFactory = _authFactory_;
                ctrl = $controller('AuthController', {
                    authFactory: authFactory
                });
            }));

            it('should registrate user', function () {
                ctrl.user = {};
                // ctrl.user.error = true;
                ctrl.register();
                expect(ctrl.dataLoaded).to.be.false;
                console.log(authFactory.register)
            });
        })

    })
})(); 