;(function () {
    'use strict';

    describe('AuthFactory', function () {
        var $window;

        describe('AuthFactory logic', function () {

            var $httpBackend,
                authFactory,
                token;

            // Set up the module
            beforeEach(module('everquizApp'));

            beforeEach(inject(function (_authFactory_,_$httpBackend_, _$window_) {
                authFactory = _authFactory_;
                $httpBackend = _$httpBackend_;
                $window = _$window_;
                token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWY5ODA1MzNlOTc1YzRhMWJmZGNlYzgiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGVzIjpbImFkbWluIl0sImV4cCI6MTQ0OTM2MTU4NSwiaWF0IjoxNDQ0MTczOTg1fQ.YFXdF2Sntu8wT6JL7i8Jp8yovZyVHoCWtpNPSlBsCdk';
            }));

            after(function () {
                $window.localStorage.clear();
            });


            describe('token and if logged', function () {
                it('should save token', function () {
                    authFactory.saveToken(token);
                    expect($window.localStorage['everquizApp-token']).to.be.equal(token);
                });

                it('should get token', function () {
                    expect(token).to.be.equal(authFactory.getToken());
                });

                it('should be logged in', function () {
                    expect(authFactory.isLoggedIn()).to.be.true;
                });

                it('should not be logged in', function () {
                    authFactory.getToken = function() {return false};
                    expect(authFactory.isLoggedIn()).to.be.false;
                });
            })

            describe('roles', function () {
                it('should be admin', function () {
                    expect(authFactory.isAdmin()).to.be.true;
                });

                it('should get email from token', function () {
                    expect(authFactory.currentUser()).to.be.equal('admin@admin.com');
                });

                it('should get id from token', function () {
                    expect(authFactory.currentUserId()).to.be.equal('55f980533e975c4a1bfdcec8');
                });

                it('should log out', function () {
                    authFactory.logOut();
                    expect($window.localStorage['everquizApp-token']).to.be.empty;
                });
            })

            describe('login/reg logic', function () {
                var user;
                beforeEach(function () {
                    user = {
                        name: 'dimon',
                        email: 'dim@epam.com',
                        roles: ['admin']
                    };
                    authFactory.saveToken = sinon.stub();
                });

                it('should registrate new user', function () {
                    $httpBackend.expectPOST('/register', user).respond(user);
                    authFactory.register(user);
                    $httpBackend.flush();
                    expect( authFactory.saveToken ).to.have.been.called;
                });

                it('should login new user', function () {
                    $httpBackend.expectPOST('/login', user).respond(user);
                    authFactory.logIn(user);
                    $httpBackend.flush();
                    expect( authFactory.saveToken ).to.have.been.called;
                });
            })

        })
        
    })
})(); 