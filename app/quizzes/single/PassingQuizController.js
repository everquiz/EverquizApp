(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('PassingQuizController', PassingQuizController);

    PassingQuizController.$inject = ['quizFactory', 'resultFactory', 'scrollFactory', 'notesService', 'authFactory'];

    function PassingQuizController(quizFactory, resultFactory, scrollFactory, notesService, authFactory) {

        var vm = this,
            localQuiz = localStorage.getItem('quiz'),
            isClicked = false;
        vm.checkResult = checkResult;
        vm.nextQuestion = nextQuestion;
        vm.saveToNote = saveToNote;
        vm.isShown = isShown;
        vm.isLoggedIn = authFactory.isLoggedIn;
        vm.dataLoaded = false;


        if (localQuiz) {
            vm.quiz = JSON.parse(localQuiz);
            vm.dataLoaded = true;
        } else {
            quizFactory.get(quizFactory.activeQuiz)
                .then(function (data) {
                    vm.quiz = data;
                    quizFactory.getQuestions(quizFactory.activeQuiz)
                        .then(function (data) {
                            vm.quiz.questions = data;
                            vm.dataLoaded = true;
                        }
                    )
                }
            );
        }

        function checkResult() {
            resultFactory.checkResult(vm.quiz);
            quizFactory.resetSlider();
            goToElement('result');
        }

        function goToElement(elemID) {
            scrollFactory.scroll(elemID);
        }

        function nextQuestion() {
            quizFactory.margin = quizFactory.margin - 1360;
            quizFactory.questionCount = quizFactory.questionCount + 1;
            quizFactory.startQuiz = true;
            isClicked = false;
            quizFactory.buttonText = 'NEXT STEP';
            var slide = {
                margin: quizFactory.margin,
                questionCount: quizFactory.questionCount,
                startQuiz: quizFactory.startQuiz,
                buttonText: quizFactory.buttonText
            };
            localStorage.setItem('quiz', JSON.stringify(vm.quiz));
            localStorage.setItem('slide', JSON.stringify(slide));
        }

        function saveToNote() {
            isClicked = true;
            var note = {
                title: vm.quiz.title,
                text: vm.quiz.questions[quizFactory.questionCount - 1].text
            };
            notesService.addNote(note);
        }

        function isShown() {
            if (quizFactory.questionCount > 0 && !isClicked) {
                return true;
            }
        }
    }
})();
