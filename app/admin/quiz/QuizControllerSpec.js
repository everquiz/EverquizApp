;(function () {
    'use strict';
    describe('QuizController', function () {
        
        describe('QuizController logic', function () {

            var questionService,
                $httpBackend,
                $window,
                ctrl,
                quizInit,
                questionToCreate,
                questionServiceMock;
            quizInit = {
                "_id": "1",
                "title": "Basics",
                "text": "CSS",
                "category": 1,
                "questions": ["1,2,3"],
                "complexity": 0,
                "status": 0
            };
            questionServiceMock = {
                create: sinon.stub(),
                update: sinon.stub(),
                remove: sinon.stub()
            };
            questionToCreate = {
                "text": "SCSS"
            };

            
            // Set up the module
            beforeEach(module('everquizApp', function ($provide) {
                $provide.value('questionService', questionServiceMock);
            }));

            beforeEach(inject(function (_$httpBackend_, $controller, _questionService_, _$window_) {
                    
                    questionService = _questionService_;
                    $httpBackend = _$httpBackend_;
                    $window = _$window_;
                    
                    ctrl = $controller('QuizController', {quiz: quizInit, questionService: questionService});
                    sinon.stub($window, 'confirm', function () {return true;});
                }));
            afterEach(function () {
                    $window.confirm.restore();
                });

            it('should get quiz on load', function () {
                expect(ctrl.quiz).to.be.deep.equal(quizInit);
            });

            describe('add/update question', function () {
                beforeEach(function () {
                        questionService.create.reset();
                        questionService.update.reset();
                    });
                it('should not add or edit category', function () {
                    questionToCreate.text = undefined;
                    ctrl.question = questionToCreate;
                    ctrl.addQuestion();
                    expect(questionService.create).not.to.have.been.called;
                    expect(questionService.update).not.to.have.been.called;
                    expect(ctrl.question).not.to.be.empty;
                });

                it('should add question', function () {
                    questionToCreate._id = undefined;
                    questionToCreate.text = 'SCSS';
                    ctrl.question = questionToCreate;
                    ctrl.addQuestion();
                    expect(questionService.create).to.have.been.called;
                    expect(questionService.update).not.to.have.been.called;
                    expect(ctrl.question).to.be.empty;
                });

                it('should update question', function () {
                    questionToCreate = quizInit;
                    questionToCreate.text = 'SCSS';
                    ctrl.question = questionToCreate;
                    ctrl.addQuestion();
                    expect(questionService.create).not.to.have.been.called;
                    expect(questionService.update).to.have.been.called;
                    expect(ctrl.question).to.be.empty;
                });
            });

            it('should edit question', function () {
                expect(ctrl.question).to.be.empty;
                ctrl.editQuestion(questionToCreate);
                expect(ctrl.question).to.be.equal(questionToCreate);
            });

            it('should remove question', function () {
                ctrl.removeQuestion(quizInit);
                expect(questionService.remove).to.have.been.calledWith(quizInit);
                expect(ctrl.question).to.be.empty;
            });

            it('should reset title for question form', function () {
                ctrl.resetTitle();
                expect(ctrl.question).to.be.empty;
                expect(ctrl.formTitle).to.be.equal('Add new question');
            });
        })
    });
})(); 