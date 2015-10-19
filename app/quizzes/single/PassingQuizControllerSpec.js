describe('PassingQuizController', function () {
    var PassingQuizCtrl, scrollFactory, resultFactory, quizFactory, notesService, $window;

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
    beforeEach(module('everquizApp'));

    it('should set quiz and dataLoaded from localStorage during controller activation', inject(function ($controller, _$window_) {
            $window = _$window_;
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

        beforeEach(inject(function ($controller, _resultFactory_, _scrollFactory_, _notesService_, _quizFactory_, $q, $rootScope, _$window_) {
                $window = _$window_;
                resultFactory = _resultFactory_;
                scrollFactory = _scrollFactory_;
                notesService = _notesService_;
                quizFactory = _quizFactory_;

                resultFactory.checkResult = sinon.stub();
                scrollFactory.scroll = sinon.stub();
                notesService.addNote = sinon.stub();

                var deferredQuiz = $q.defer();
                deferredQuiz.resolve(quizFromFactory);
                var deferredQuestions = $q.defer();
                deferredQuestions.resolve(questions);

                quizFactory.get = sinon.stub();
                quizFactory.get.returns(deferredQuiz.promise);
                quizFactory.getQuestions = sinon.stub();
                quizFactory.getQuestions.returns(deferredQuestions.promise);
                quizFactory.resetSlider = sinon.stub();
                quizFactory.slide = sinon.stub();
                quizFactory.questionCount = 1;

                PassingQuizCtrl = $controller('PassingQuizController');
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