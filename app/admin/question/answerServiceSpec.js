;(function () {
    'use strict';

    describe('AnswerService', function () {
        describe('AnswerService logic', function () {
            var questionService,
                answerService,
                $httpBackend,
                answers;

            // Set up the module
            beforeEach(module('everquizApp', function ($provide) {
                $provide.service('questionService', function ($q) {
                    return {
                        update: sinon.stub()
                    }
                })
            }));

            beforeEach(inject(function (_answerService_, _questionService_, _$httpBackend_) {
                    answerService = _answerService_;
                    questionService = _questionService_;
                    $httpBackend = _$httpBackend_;
                    answers = [{"_id": "1", "text": "CSS", "correct": "true"}];
                }));

            it('should get answer', function () {
                var answer;
                $httpBackend.whenGET('/api/v1/Answers/1')
                    .respond(answers[0]);
                answerService.get(1).then(function (data) {
                    answer = data;
                });
                $httpBackend.flush();
                expect(answer).to.deep.equal(answers[0]);
            });

            it('should create answer', function () {
                var answerToCreate;
                answerToCreate = {text: 'RUBY', correct: false};
                answerToCreate.question = {};
                answerToCreate.question.answers = answers;
                $httpBackend.whenPOST('/api/v1/Answers').respond(answerToCreate);
                answerService.create(answerToCreate);
                $httpBackend.flush();
                expect(answerToCreate.text).to.equal(answers[answers.length-1].text);
                expect(answers.length).to.be.equal(2);
                expect(questionService.update).to.have.been.calledWith(answerToCreate.question);
            });

            it('should delete answer', function () {
                var answerToDelete, 
                    question = {};
                question.answers = answers;
                $httpBackend.whenDELETE('/api/v1/Answers/1').respond(answers[0]);
                answerService.remove(answers[0], question);
                $httpBackend.flush();
                
                expect(answers.length).to.be.equal(0);
                expect(questionService.update).to.have.been.calledWith(question);
            });

            it('should update answer', function () {
                var answerToUpdate;
                answerToUpdate = {"_id": "1", "text": "SCSS", "correct": "false"};
                $httpBackend.whenPUT('/api/v1/Answers/1').respond(function (method, url, data) {
                        answers[0] = angular.fromJson(data);
                        return 200;
                    });
                answerService.update(answerToUpdate);
                $httpBackend.flush();
                expect(answerToUpdate).to.deep.equal(answers[0]);
            });

        })
    })
})(); 