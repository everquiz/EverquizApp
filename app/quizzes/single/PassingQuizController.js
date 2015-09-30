(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('PassingQuizController', PassingQuizController);

    PassingQuizController.$inject = ['quizService', 'scrollFactory', 'notesService'];

    function PassingQuizController(quizService, scrollFactory, notesService) {

        var vm = this,
            localQuiz = localStorage.getItem('quiz'),
            isClicked = false;
        vm.checkResult = checkResult;
        vm.nextQuestion = nextQuestion;
        vm.saveToNote = saveToNote;
        vm.isShown = isShown;

        if (localQuiz) {
            vm.quiz = JSON.parse(localQuiz);
        } else {
            quizService.get(quizService.activeQuiz).then(
                function (data) {
                    vm.quiz = data;
                    quizService.getQuestions(quizService.activeQuiz).then(
                        function (data) {
                            vm.quiz.questions = data;
                        }
                    )
                }
            );
        }

        function checkResult() {
            quizService.checkResult(vm.quiz);
            quizService.activeQuiz = null;
            quizService.margin = 0;
            quizService.questionCount = 0;
            quizService.startQuiz = false;
            quizService.buttonText = 'START QUIZ!';
            localStorage.removeItem('quiz');
            localStorage.removeItem('slide');
            goToElement('result');
        }

        function goToElement(elemID) {
            scrollFactory.scroll(elemID);
        }

        function nextQuestion() {
            quizService.margin = quizService.margin - 1360;
            quizService.questionCount = quizService.questionCount + 1;
            quizService.startQuiz = true;
            isClicked = false;
            quizService.buttonText = 'NEXT STEP';
            var slide = {
                margin: quizService.margin,
                questionCount: quizService.questionCount,
                startQuiz: quizService.startQuiz,
                buttonText: quizService.buttonText
            };
            localStorage.setItem('quiz', JSON.stringify(vm.quiz));
            localStorage.setItem('slide', JSON.stringify(slide));
        }

        function saveToNote() {
            isClicked = true;
            var note = {
                title: vm.quiz.title,
                text: vm.quiz.questions[quizService.questionCount - 1].text
            };
            notesService.addNote(note);
        }

        function isShown() {
            if (quizService.questionCount > 0 && !isClicked) {
                return true;
            }
        }
    }
})();
