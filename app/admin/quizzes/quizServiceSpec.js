;(function () {
    'use strict';

    describe('QuizService', function () {
        var quizService, $httpBackend, quizzes, categoryService;

        // Set up the module
        beforeEach(module('everquizApp', function ($provide) {
            $provide.service('categoryService', function ($q) {
                return {
                    get: function () {
                        var deferred = $q.defer();
                        deferred.resolve('HTML');
                        return deferred.promise;
                    }
                }
            })
        }));

        beforeEach(inject(function (_quizService_, _$httpBackend_, $q) {
                quizService = _quizService_;
                $httpBackend = _$httpBackend_;
                quizzes = [{
                    _id: 1,
                    title: "Basics",
                    description: "CSS",
                    category: 1,
                    questions: [1,2,3],
                    complexity: 0,
                    status: 1
                }];
            }));

        it('should get quizzes', function () {
            var quizzesGetAll;
            $httpBackend.whenGET('/api/v1/Quizzes?populate=category&select=category._id,category.title')
                .respond(quizzes);
            quizzesGetAll = quizService.getAll();
            $httpBackend.flush();
            expect(quizzesGetAll).to.deep.equal(quizzes);
        });

        it('should get quiz', function () {
            var quiz;
            $httpBackend.whenGET('/api/v1/Quizzes/1?populate=questions')
                .respond(quizzes[0]);
            quizService.get(1).then(function (data) {
                quiz = data;
            });
            $httpBackend.flush();
            expect(quiz).to.deep.equal(quizzes[0]);
        });

        it('should create quiz', function () {
            var quizToCreate;
            quizToCreate = {_id: 2, title: 'Expert', description: 'Expert ruby', category: 1};
            $httpBackend.whenPOST('/api/v1/Quizzes').respond(quizToCreate);
            quizService.create(quizToCreate).success(function (data) {
                quizToCreate = data;
                quizzes.push(angular.fromJson(data));
            });
            $httpBackend.flush();
            expect(quizToCreate).to.deep.equal(quizzes[quizzes.length-1]);
            expect(quizzes.length).to.be.equal(2);
        });

        it('should update quiz', function () {
            var quizToUpdate;
            quizToUpdate = {
                    _id: 1,
                    title: "Expert",
                    description: "Ruby",
                    category: 2,
                    questions: [1,2,3,5],
                    complexity: 1,
                    status: 1
                };
            $httpBackend.whenPUT('/api/v1/Quizzes/1').respond(function (method, url, data) {
                    quizzes[0] = angular.fromJson(data);
                    return 200;
                });
            quizService.update(quizToUpdate);
            $httpBackend.flush();
            expect(quizToUpdate).to.deep.equal(quizzes[0]);
        });

        it('should unactive quiz', function () {
            var quizToUnactive;
            quizToUnactive = {
                    _id: 1,
                    title: "Basics",
                    description: "CSS",
                    category: 1,
                    questions: [1,2,3],
                    complexity: 0,
                    status: 0
                };
            $httpBackend.whenPUT('/api/v1/Quizzes/1').respond(function (method, url, data) {
                    quizzes[0] = angular.fromJson(data);
                    return 200;
                });
            quizService.unactive(quizToUnactive);
            $httpBackend.flush();
            expect(quizzes.length).to.be.equal(1);
            expect(quizzes[0].status).to.be.equal(0);
        });

        it('should active quiz', function () {
            var quizToActive;
            quizToActive = {
                    _id: 1,
                    title: "Basics",
                    description: "CSS",
                    category: 1,
                    questions: [1,2,3],
                    complexity: 0,
                    status: 1
                };
            $httpBackend.whenPUT('/api/v1/Quizzes/1').respond(function (method, url, data) {
                    quizzes[0] = angular.fromJson(data);
                    return 200;
                });
            quizService.active(quizToActive);
            $httpBackend.flush();
            expect(quizzes.length).to.be.equal(1);
            expect(quizzes[0].status).to.be.equal(1);
        });

        it('should get difficulties', function () {
            var difficulties = [
                {_id: 0, title: 'Novice'},
                {_id: 1, title: 'Advanced'},
                {_id: 2, title: 'Expert'}
            ]
            expect(difficulties).to.deep.equal(quizService.getDifficulties());
        });

        it('should get complexity', function () {
            expect(quizService.getComplexity(quizzes[0].complexity)).to.be.equal('Novice');
        });
    })
})(); 