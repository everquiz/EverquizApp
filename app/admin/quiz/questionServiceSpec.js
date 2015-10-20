;(function () {
    'use strict';

    describe('QuestionService', function () {
        var questionService,
            quizService,
            $httpBackend,
            questions;

        // Set up the module
        beforeEach(module('everquizApp', function ($provide) {
            $provide.service('quizService', function ($q) {
                return {
                    update: sinon.stub()
                }
            })
        }));


        beforeEach(inject(function (_questionService_, _$httpBackend_, _quizService_) {
                questionService = _questionService_;
                quizService = _quizService_;
                $httpBackend = _$httpBackend_;
                questions = [{"_id": "1", "text": "CSS", "quiz": "1", "answers": [1,2,3]}];
            }));

        it('should get question', function () {
            var question;
            $httpBackend.whenGET('/api/v1/Questions/1?populate=answers')
                .respond(questions[0]);
            questionService.get(1).then(function (data) {
                question = data;
            });
            $httpBackend.flush();
            expect(question).to.deep.equal(questions[0]);
        });

        it('should create question', function () {
            var questionToCreate;
            questionToCreate = {_id: 2, text: 'RUBY', quiz: 1};
            questionToCreate.quiz = {};
            questionToCreate.quiz.questions = questions;
            $httpBackend.whenPOST('/api/v1/Questions').respond(questionToCreate);
            questionService.create(questionToCreate);
            $httpBackend.flush();
            expect(questionToCreate.text).to.equal(questions[questions.length-1].text);
            expect(questions.length).to.be.equal(2);
            expect(quizService.update).to.have.been.calledWith(questionToCreate.quiz);
        });

        it('should delete question', function () {
            var questionToDelete, 
                quiz = {};
            questionToDelete = {"_id": "1", "text": "CSS", "quiz": "1", "answers": [1,2,3]};
            quiz.questions = questions;
            $httpBackend.whenDELETE('/api/v1/Questions/1').respond(questionToDelete);
            $httpBackend.expectDELETE('/api/v1/Answers/3').respond(true);
            $httpBackend.expectDELETE('/api/v1/Answers/2').respond(true);
            $httpBackend.expectDELETE('/api/v1/Answers/1').respond(true);
            questionService.remove(questionToDelete, quiz);
            $httpBackend.flush();
            
            expect(questions.length).to.be.equal(0);
            expect(questions).not.to.contain(questionToDelete);
            expect(quizService.update).to.have.been.calledWith(quiz);
        });

        it('should update question', function () {
            var questionToUpdate;
            questionToUpdate = {"_id": "1", "text": "SCSS", "quiz": "1", "answers": [1,2,3]};
            $httpBackend.whenPUT('/api/v1/Questions/1').respond(function (method, url, data) {
                    questions[0] = angular.fromJson(data);
                    return 200;
                });
            questionService.update(questionToUpdate);
            $httpBackend.flush();
            expect(questionToUpdate).to.deep.equal(questions[0]);
        });

    })
})(); 