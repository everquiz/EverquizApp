(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('PassingQuizController', PassingQuizController);

    PassingQuizController.$inject = ['quizService'];

    function PassingQuizController(quizService) {

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
        }
    }
})();
