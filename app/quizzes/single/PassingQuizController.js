(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('PassingQuizController', PassingQuizController);

    PassingQuizController.$inject = ['quizService', 'scrollFactory'];

    function PassingQuizController(quizService, scrollFactory) {

        var vm = this;
        vm.checkResult = checkResult;
        vm.nextQuestion = nextQuestion;
        vm.buttonText = 'START QUIZ!';
        vm.slide = 0;

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

        function checkResult() {
            quizService.checkResult(vm.quiz);
            quizService.activeQuiz = null;
            localStorage.removeItem('quiz');
            localStorage.removeItem('slide');
            goToElement('result');
        }

        function goToElement (elemID) {
            scrollFactory.scroll(elemID);
        }

        function nextQuestion () {
            vm.slide = vm.slide - 1360;
            vm.questionCount = vm.questionCount + 1; 
            vm.startQuiz = true; 
            vm.buttonText = 'NEXT STEP';
            var slide = {
                margin: vm.slide,
                questionCount: vm.questionCount,
                startQuiz: vm.startQuiz,
                buttonText: vm.buttonText
            };
            localStorage.setItem('quiz', JSON.stringify(vm.quiz));
            localStorage.setItem('slide', JSON.stringify(slide));
        }


    }
})();
