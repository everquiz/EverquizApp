(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('PassingQuizController', PassingQuizController);

    PassingQuizController.$inject = ['quizService'];

    function PassingQuizController(quizService) {

        var vm = this;
        vm.quizService = quizService;
        vm.checkResult = checkResult;

        quizService.get(quizService.activeQuiz).then(
            function (data) {
                vm.quiz = data;
            }
        )

        quizService.getAnswers(quizService.activeQuiz).then(
            function (data) {
                vm.quiz.questions = data;
            }
        )

        function checkResult() {
            quizService.checkResult(self.quiz).then(
                function (data) {
                    self.result = data;
                    }
                )
            }
    }
})();