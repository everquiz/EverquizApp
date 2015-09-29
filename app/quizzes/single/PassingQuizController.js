(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('PassingQuizController', PassingQuizController);

    PassingQuizController.$inject = ['quizService', 'scrollFactory'];

    function PassingQuizController(quizService, scrollFactory) {

        var vm = this,
            localQuiz = localStorage.getItem('quiz');
        vm.checkResult = checkResult;
        vm.nextQuestion = nextQuestion;
        
        if(localQuiz){
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
            localStorage.removeItem('quiz');
            localStorage.removeItem('slide');
            goToElement('result');
        }

        function goToElement (elemID) {
            scrollFactory.scroll(elemID);
        }

        function nextQuestion () {
            quizService.margin = quizService.margin - 1360; 
            quizService.questionCount = quizService.questionCount + 1; 
            quizService.startQuiz = true; 
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


    }
})();
