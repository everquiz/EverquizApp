describe('PassingQuizController', function () {
    var PassingQuizCtrl, scrollFactory, resultFactory, quizFactory, $window;

    var quizFromFactory = {
        _id: 1,
        title: 'QuizTitle',
        questions: [1, 2, 3]
    };

    var questions = [{
        _id: 1,
        text: 'QuestionText',
        answers: [
            {
                _id: 1
            }
        ]
    }];

    // Set up the module
    beforeEach(module('everquizApp', function ($provide) {
        $provide.value('resultFactory', resultFactory = {
            checkResult: sinon.stub()
        });
        $provide.value('scrollFactory', scrollFactory = {
            scroll: sinon.stub()
        });
        $provide.value('notesService', notesService = {
            addNote: sinon.stub()
        });
    }));

    it('should set quiz and dataLoaded from localStorage during controller activation', inject(function ($controller, $window) {
            var quizFromLocalStorage = {
                _id: 2,
                questions: [3, 2, 1]
            };
            $window.localStorage.setItem('quiz', JSON.stringify(quizFromLocalStorage));
            PassingQuizCtrl = $controller('PassingQuizController');
            expect(PassingQuizCtrl.quiz).to.be.deep.equal(quizFromLocalStorage);
            expect(PassingQuizCtrl.dataLoaded).to.be.true;
            $window.localStorage.removeItem('quiz');
        })
    );

    describe('controller logic', function () {

        beforeEach(inject(function ($controller, $q, $rootScope, _$window_) {
                $window = _$window_;
                quizFactory = {
                    get: function () {
                        var deferred = $q.defer();
                        deferred.resolve(quizFromFactory);
                        return deferred.promise;
                    },
                    getQuestions: function () {
                        var deferred = $q.defer();
                        deferred.resolve(questions);
                        return deferred.promise;
                    },
                    resetSlider: sinon.stub(),
                    slide: sinon.stub(),
                    questionCount: 1
                };
                PassingQuizCtrl = $controller('PassingQuizController', {quizFactory: quizFactory});
                $rootScope.$apply();
            })
        );

        afterEach(function () {
            $window.localStorage.clear();
        });

        it('should set quiz and dataLoaded from quizFactory during controller activation', function () {
            expect(PassingQuizCtrl.quiz).to.be.deep.equal(quizFromFactory);
            expect(PassingQuizCtrl.dataLoaded).to.be.true;
        });

        it('should use resultFactory checkResult to send data, quizFactory resetSlider and scrollFactory scroll', function () {
            expect(resultFactory.checkResult).not.to.have.been.calledWith(PassingQuizCtrl.quiz);
            expect(quizFactory.resetSlider).not.to.have.been.called;
            expect(scrollFactory.scroll).not.to.have.been.called;
            PassingQuizCtrl.checkResult();
            expect(resultFactory.checkResult).to.have.been.calledWith(PassingQuizCtrl.quiz);
            expect(quizFactory.resetSlider).to.have.been.called;
            expect(scrollFactory.scroll).to.have.been.called;
        });

        describe('slide to next question', function () {
            it('should use quizFactory slide function', function () {
                expect(quizFactory.slide).not.to.have.been.called;
                PassingQuizCtrl.nextQuestion();
                expect(quizFactory.slide).to.have.been.called;

            });

            it('should save quiz and slide position to localStorage', function () {
                expect($window.localStorage.getItem('quiz')).not.to.be.defined;
                expect($window.localStorage.getItem('slide')).not.to.be.defined;

                PassingQuizCtrl.nextQuestion();
                expect($window.localStorage.getItem('quiz')).to.be.defined;
                expect($window.localStorage.getItem('slide')).to.be.defined;
            });
        });

        it('should save to note', function () {
            var note = {
                title: 'QuizTitle',
                text: 'QuestionText'
            };
            expect(notesService.addNote).not.to.have.been.called;
            PassingQuizCtrl.saveToNote();
            expect(notesService.addNote).to.have.been.calledWith(note);
        });

        it('should return true while answering questions and before pressing button', function () {
            expect(PassingQuizCtrl.isShown()).to.be.true;
            quizFactory.questionCount = 0;
            expect(PassingQuizCtrl.isShown()).not.to.be.true;
            quizFactory.questionCount = 1;
            PassingQuizCtrl.saveToNote();
            expect(PassingQuizCtrl.isShown()).not.to.be.true;
        });
    });
});