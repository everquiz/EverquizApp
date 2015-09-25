(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('PassingQuizController', PassingQuizController);

    PassingQuizController.$inject = ['quizService', 'scrollFactory'];

    function PassingQuizController(quizService, scrollFactory) {

        var vm = this;
        vm.checkResult = checkResult;
        vm.goToElement = goToElement;

        quizService.get(quizService.activeQuiz).then(
            function (data) {
                vm.quiz = data;
                quizService.getQuestions(quizService.activeQuiz).then(
                    function (data) {
                        vm.quiz.questions = data.shuffle(data).splice(0,10);
                    }
                )
            }
        );

        function checkResult() {
            quizService.checkResult(vm.quiz);
        }

        function goToElement (elemID) {
            scrollFactory.scroll(elemID);
        }
    }
})();
