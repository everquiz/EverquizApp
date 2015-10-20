;
(function() {
    'use strict';
    describe('QuestionService', function() {
        describe('QuestionService logic', function() {
            var answerService,
                $httpBackend,
                $window,
                ctrl,
                questionInit,
                answerToCreate,
                answerServiceMock;
            questionInit = {
                "_id": "1",
                "text": "CSS",
                "answers": [1, 2, 3],
                "quiz": 1
            };
            answerToCreate = {
                "_id": "2",
                "text": "SCSS"
            }
            answerServiceMock = {
                create: sinon.stub(),
                update: sinon.stub(),
                remove: sinon.stub()
            };

            // Set up the module
            beforeEach(module('everquizApp', function($provide) {
                $provide.value('answerService', answerServiceMock);
            }));

            beforeEach(inject(function(_$httpBackend_, $controller, _answerService_, _$window_) {

                answerService = _answerService_;
                $httpBackend = _$httpBackend_;
                $window = _$window_;

                ctrl = $controller('QuestionController', {
                    question: questionInit,
                    answerService: answerService
                });
                sinon.stub($window, 'confirm', function() {
                    return true;
                });
            }));

            afterEach(function() {
                $window.confirm.restore();
            });

            it('should get question on load', function() {
                expect(ctrl.question).to.be.deep.equal(questionInit);
            });

            describe('add/update answer', function () {
                beforeEach(function () {
                        answerService.create.reset();
                        answerService.update.reset();
                    });
                it('should not add or edit answer', function () {
                    answerToCreate.text = undefined;
                    ctrl.answer = answerToCreate;
                    ctrl.addAnswer();
                    expect(answerService.create).not.to.have.been.called;
                    expect(answerService.update).not.to.have.been.called;
                    expect(ctrl.answer).not.to.be.empty;
                });

                it('should add answer', function () {
                    answerToCreate._id = undefined;
                    answerToCreate.text = 'SCSS';
                    ctrl.answer = answerToCreate;
                    ctrl.addAnswer();
                    expect(answerService.create).to.have.been.called;
                    expect(answerService.update).not.to.have.been.called;
                    expect(ctrl.answer).to.be.empty;
                });

                it('should update answer', function () {
                    answerToCreate._id = 1;
                    answerToCreate.text = 'SCSS';
                    ctrl.answer = answerToCreate;
                    ctrl.addAnswer();
                    expect(answerService.create).not.to.have.been.called;
                    expect(answerService.update).to.have.been.called;
                    expect(ctrl.answer).to.be.empty;
                });
            });

            it('should edit answer', function () {
                expect(ctrl.answer).to.be.empty;
                ctrl.editAnswer(answerToCreate);
                expect(ctrl.answer).to.be.equal(answerToCreate);
            });

            it('should remove answer', function () {
                ctrl.removeAnswer(questionInit);
                expect(answerService.remove).to.have.been.calledWith(questionInit);
                expect(ctrl.answer).to.be.empty;
            });

            it('should reset title for answer form', function () {
                ctrl.resetTitle();
                expect(ctrl.answer).to.be.empty;
                expect(ctrl.formTitle).to.be.equal('Add new answer');
            });
        })
    })
})();