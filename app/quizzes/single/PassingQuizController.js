(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('PassingQuizController', PassingQuizController);

    PassingQuizController.$inject = ['quizService', 'scrollFactory'];

    function PassingQuizController(quizService, scrollFactory) {

        var vm = this;
        vm.checkResult = checkResult;

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
            goToElement('result');
        }

        function goToElement (elemID) {
            scrollFactory.scroll(elemID);
        }
    }
})();
