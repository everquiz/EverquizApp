;(function () {
    'use strict';
    describe('QuizzesController', function () {

        var quizService,
            categoryService, 
            $httpBackend, 
            $window, 
            ctrl, 
            quizToCreate, 
            quizServiceMock,
            quizzesInit;

        quizToCreate = {
            "_id": "2",
            "title": "Expert",
            "description": "SCSS",
            "category": 2,
            "questions": ["1,2,5"],
            "complexity": 1,
            "status": 1
        };
        quizzesInit = [{
            "_id": "1",
            "title": "Basics",
            "description": "CSS",
            "category": 1,
            "questions": ["1,2,3"],
            "complexity": 0,
            "status": 0
        }];
        quizServiceMock = {
                getDifficulties: sinon.stub(),
                create: sinon.stub(),
                update: sinon.stub(),
                active: function (quiz) {
                    quizzesInit[0].status = 1;
                },
                unactive: function (quiz) {
                    quizzesInit[0].status = 0;
                }
            };

        // Set up the module
        beforeEach(module('everquizApp', function ($provide) {
                $provide.value('quizService', quizServiceMock);
                $provide.service('categoryService', function ($q) {
                    return {
                        getAll: function () {
                            return ['HTML', 'CSS'];
                        }
                    }
                });
            }));

        beforeEach(inject(function (_$httpBackend_, $controller, _quizService_, _categoryService_, _$window_) {
                
                quizService = _quizService_;
                categoryService = _categoryService_;
                $httpBackend = _$httpBackend_;
                $window = _$window_;
                
                ctrl = $controller('QuizzesController', {quizzes: quizzesInit, quizService: quizService, categoryService: categoryService});
                sinon.stub($window, 'confirm', function () {return true;});
            }));
        afterEach(function () {
                $window.confirm.restore();
            });

        it('should get all quizzes on load', function () {
            expect(ctrl.quizzes).to.be.deep.equal(quizzesInit);

        });

        describe('add/update quiz', function () {
            beforeEach(function () {
                    quizService.create.reset();
                    quizService.update.reset();
                });
            it('should not add or edit quiz', function () {
                ctrl.quiz = {"description": "SASS"};
                ctrl.addQuiz();
                expect(quizService.create).not.to.have.been.called;
                expect(quizService.update).not.to.have.been.called;
                expect(ctrl.quiz).not.to.be.empty;
            });

            it('should add quiz', function () {
                quizToCreate._id = undefined;
                ctrl.quiz = quizToCreate;
                ctrl.addQuiz();
                expect(quizService.create).to.have.been.called;
                expect(quizService.update).not.to.have.been.called;
                expect(ctrl.quiz).to.be.empty;
            });

            it('should update quiz', function () {
                quizToCreate._id = 1;
                quizToCreate.title = 'Pro';
                ctrl.quiz = quizToCreate;
                ctrl.addQuiz();
                expect(quizService.create).not.to.have.been.called;
                expect(quizService.update).to.have.been.called;
                expect(ctrl.quiz).to.be.empty;
            });
        });

        it('should edit quiz', function () {
            expect(ctrl.quiz).to.be.empty;
            ctrl.editQuiz(quizToCreate);
            expect(ctrl.quiz).to.be.equal(quizToCreate);
        });

        it('should reset title for quiz form', function () {
            ctrl.resetTitle();
            expect(ctrl.quiz).to.be.empty;
            expect(ctrl.formTitle).to.be.equal('Add new quiz');
        });

        it('should activate quiz', function () {
            ctrl.activateQuiz(quizzesInit[0]);
            expect(quizzesInit[0].status).to.be.equal(1);
        });

        it('should deactivate quiz', function () {
            quizzesInit[0].status = 1;
            ctrl.deactivateQuiz(quizzesInit[0]);
            expect(quizzesInit[0].status).to.be.equal(0);
        });

        it('should get status of quiz', function () {
            expect(ctrl.getStatus(quizzesInit[0].status)).to.be.equal('Unactive');
            quizzesInit[0].status = 1;
            expect(ctrl.getStatus(quizzesInit[0].status)).to.be.equal('Active');
        });
    });
})(); 