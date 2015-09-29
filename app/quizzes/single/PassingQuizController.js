(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('PassingQuizController', PassingQuizController);

    PassingQuizController.$inject = ['quizService', 'scrollFactory', '$scope'];

    function PassingQuizController(quizService, scrollFactory, $scope) {

        var vm = this;
        vm.checkResult = checkResult;
        vm.nextQuestion = nextQuestion;
        $scope.buttonText = 'START QUIZ!';
        $scope.slide = 0;

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

        function nextQuestion () {
            console.log('nextQuestion');
            $scope.slide = $scope.slide - 1360; 
            $scope.questionCount = $scope.questionCount + 1; 
            $scope.startQuiz = true; 
            $scope.buttonText = 'NEXT STEP';
        }
    }
})();
