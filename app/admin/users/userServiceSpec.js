;(function () {
    'use strict';

    describe('UserService', function () {
        describe('UserService logic', function () {
            var userService,
                $httpBackend,
                users;

            // Set up the module
            beforeEach(module('everquizApp'));

            beforeEach(inject(function (_userService_, _$httpBackend_) {
                userService = _userService_;
                $httpBackend = _$httpBackend_;
                users = [{_id: "1", name: "Dimon", email: "dim@epam.com"}];
            }));

            it('should get users', function () {
                var usersGetAll;
                $httpBackend.whenGET('/api/v1/Users')
                    .respond(users);
                usersGetAll = userService.getAll();
                $httpBackend.flush();
                expect(usersGetAll).to.deep.equal(users);
            });

            it('should get user', function () {
                var user;
                $httpBackend.whenGET('/api/v1/Users/1?populate=notes')
                    .respond(users[0]);
                userService.get(1).then(function (data) {
                    user = data;
                });
                $httpBackend.flush();
                expect(user).to.deep.equal(users[0]);
            });

            it('should create user', function () {
                var userToCreate;
                userToCreate = {name: 'Kostya', email: 'kostya@epam.com'};
                $httpBackend.whenPOST('/api/v1/Users').respond(userToCreate);
                userService.create(userToCreate).success(function (data) {
                    userToCreate = data;
                    users.push(angular.fromJson(data));
                });
                $httpBackend.flush();
                expect(userToCreate).to.deep.equal(users[users.length-1]);
                expect(users.length).to.be.equal(2);
            });

            it('should update user', function () {
                var userToUpdate;
                userToUpdate = {
                        "_id": "1",
                        "title": "Expert",
                        "description": "Ruby",
                        "category": "2",
                        "questions": ["1,2,3,5"],
                        "complexity": 1,
                        "status": 1
                    };
                $httpBackend.whenPUT('/api/v1/Users/1').respond(function (method, url, data) {
                        users[0] = angular.fromJson(data);
                        return 200;
                    });
                userService.update(userToUpdate);
                $httpBackend.flush();
                expect(userToUpdate).to.deep.equal(users[0]);
            });
        });
    });
})(); 