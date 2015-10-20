;(function() {
    'use strict';

    describe('UsersController', function() {

        describe('UsersController logic', function() {
            var userService,
                $httpBackend,
                ctrl,
                userToCreate,
                users;
            users = [{
                _id: "1",
                name: "Vasya",
                email: "vas@epam.com"
            }];
            userToCreate = {
                _id: "1",
                name: "Dimon",
                email: "dim@epam.com"
            };

            // Set up the module
            beforeEach(module('everquizApp', function ($provide) {
                $provide.value('userService', {
                    create: sinon.stub(),
                    update: sinon.stub()
                });
            }));
            beforeEach(inject(function(_$httpBackend_, $controller, _quizService_, _userService_) {
                userService = _userService_;
                $httpBackend = _$httpBackend_;
                ctrl = $controller('UsersController', {
                    users: users,
                    userService: userService
                });
            }));

            it('should get all users on load', function () {
                expect(ctrl.users).to.be.deep.equal(users);
            });

            describe('add/update user', function () {
                beforeEach(function () {
                        userService.create.reset();
                        userService.update.reset();
                    });
                it('should not add or edit user', function () {
                    ctrl.user = {"email": "egor@gmail.com"};
                    ctrl.addUser();
                    expect(userService.create).not.to.have.been.called;
                    expect(userService.update).not.to.have.been.called;
                    expect(ctrl.user).not.to.be.empty;
                });

                it('should add user', function () {
                    userToCreate._id = undefined;
                    ctrl.user = userToCreate;
                    ctrl.addUser();
                    expect(userService.create).to.have.been.called;
                    expect(userService.update).not.to.have.been.called;
                    expect(ctrl.user.emailDis).to.be.equal(false);
                    expect(ctrl.user.emailDis).to.have.hasOwnProperty('emailDis');
                });

                it('should update user', function () {
                    userToCreate._id = 1;
                    userToCreate.name = 'Denis';
                    ctrl.user = userToCreate;
                    ctrl.addUser();
                    expect(userService.create).not.to.have.been.called;
                    expect(userService.update).to.have.been.called;
                    expect(ctrl.user.emailDis).to.be.equal(false);
                    expect(ctrl.user.emailDis).to.have.hasOwnProperty('emailDis');
                });
            });

            it('should edit user', function () {
                expect(ctrl.user).to.be.empty;
                ctrl.editUser(userToCreate);
                expect(ctrl.user).to.be.equal(userToCreate);
            });

            it('should reset title for user form', function () {
                ctrl.resetTitle();
                expect(ctrl.user.emailDis).to.be.equal(false);
                expect(ctrl.user.emailDis).to.have.hasOwnProperty('emailDis');
                expect(ctrl.formTitle).to.be.equal('Add new user');
            });
        })
    })
})();