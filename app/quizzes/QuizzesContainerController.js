(function() {
    'use strict';

    angular
        .module('everquizApp')
        .controller('QuizzesContainerController', QuizzesContainerController);

    QuizzesContainerController.$inject = ['quizService'];

    function QuizzesContainerController (quizService) {

        var vm = this,
            localQuiz = localStorage.getItem('quiz');
        vm.backToAllQuizzes = backToAllQuizzes;
        vm.quizService = quizService;
        vm.isVisible = quizService.isVisible;
        if (localQuiz) {
            console.log('if localQuiz')
            vm.quizService.activeQuiz = JSON.parse(localQuiz)._id;
            var slide = JSON.parse(localStorage.getItem('slide'));
            if(slide){
                console.log('if slide')
                vm.quizService.margin = slide.margin; 
                vm.quizService.questionCount = slide.questionCount; 
                vm.quizService.startQuiz = slide.startQuiz; 
                vm.quizService.buttonText = slide.buttonText;
            }
        };

        function backToAllQuizzes () {
            vm.quizService.margin = 0; 
            vm.quizService.questionCount = 0; 
            vm.quizService.startQuiz = false; 
            vm.quizService.buttonText = 'START QUIZ!';
            vm.quizService.activeQuiz = null;
            localStorage.removeItem('quiz');
            localStorage.removeItem('slide');
        }
    }

})();