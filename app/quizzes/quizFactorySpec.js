'use strict';

describe('QuizFactory', function () {
    var quizFactory, $httpBackend, $window;

    var respondQuizzes = [
        {
            _id: "1",
            category: {},
            "title": "firstQuiz",
            description: "desc",
            questions: [],
            complexity: 0,
            status: 1,
            editedAt: "2015-09-18T13:58:44.579Z",
            createAt: "2015-09-18T13:58:44.579Z",
            __v: 0
        }
    ];

    // Set up the module
    beforeEach(module('everquizApp'));

    beforeEach(inject(function (_quizFactory_, _$httpBackend_, _$window_) {
            quizFactory = _quizFactory_;
            $httpBackend = _$httpBackend_;
            $window = _$window_;

            $httpBackend.whenGET('/api/v1/Quizzes?populate=category&status=1')
                .respond(respondQuizzes);
            $httpBackend.whenGET('/api/v1/Quizzes?populate=category&status=1&category=!=-11111111111111111111111&complexity=0')
                .respond(respondQuizzes);
            $httpBackend.whenGET('/api/v1/Quizzes/1?populate=questions')
                .respond(respondQuizzes[0]);
            $httpBackend.whenGET('/api/v1/Questions?quiz=1&populate=answers&select=answers.text,text,quiz')
                .respond(respondQuizzes[0].questions);
        })
    );

    it('should get quizzes', function () {
        var quizzes;
        quizFactory.getQuizzes()
            .then(function (data) {
                quizzes = data;
            });
        $httpBackend.flush();

        expect(quizzes).to.be.instanceOf(Array);
        expect(quizzes).to.be.deep.equal(respondQuizzes);
    });

    it('should get quizzes by query', function () {
        var quizzes;
        quizFactory.getQuizzesByQuery('&category=!=-11111111111111111111111&complexity=0')
            .then(function (data) {
                quizzes = data;
            });
        $httpBackend.flush();

        expect(quizzes).to.be.instanceOf(Array);
        expect(quizzes).to.be.deep.equal(respondQuizzes);
    });

    it('should get quiz by id', function () {
        var quiz;
        quizFactory.get('1')
            .then(function (data) {
                quiz = data;
            });
        $httpBackend.flush();

        expect(quiz).to.be.deep.equal(respondQuizzes[0])
    });

    it('should get questions from quiz with some id', function () {
        var questions;
        quizFactory.getQuestions('1')
            .then(function (data) {
                questions = data;
            });
        $httpBackend.flush();

        expect(questions).to.be.instanceOf(Array);
    });
    describe('resetSlider function', function () {
        it('should remove quiz and slide from local storage', function () {
            quizFactory.resetSlider();

            expect($window.localStorage.getItem('quiz')).to.be.empty;
            expect($window.localStorage.getItem('slide')).to.be.empty;
        });

        it('should reset active quiz to null', function () {
            quizFactory.resetSlider();

            expect(quizFactory.activeQuiz).to.be.null;
        });

        it('should reset questionCount, buttonText, startQuiz, margin', function () {
            quizFactory.resetSlider();

            expect(quizFactory.questionCount).to.be.equal(0);
            expect(quizFactory.buttonText).to.be.equal('START QUIZ!');
            expect(quizFactory.startQuiz).to.be.false;
            expect(quizFactory.margin).to.be.equal(0);
        });
    });
});