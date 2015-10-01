(function() {
    'use strict';

    angular
        .module('everquizApp')
        .controller('QuizzesContainerController', QuizzesContainerController);

    QuizzesContainerController.$inject = ['quizFactory'];

    function QuizzesContainerController (quizFactory) {

        var vm = this,
            localQuiz = localStorage.getItem('quiz');
        vm.backToAllQuizzes = backToAllQuizzes;
        vm.quizFactory = quizFactory;
        vm.isVisible = quizFactory.isVisible;
        if (localQuiz) {
            vm.quizFactory.activeQuiz = JSON.parse(localQuiz)._id;
            var slide = JSON.parse(localStorage.getItem('slide'));
            if(slide){
                vm.quizFactory.margin = slide.margin; 
                vm.quizFactory.questionCount = slide.questionCount; 
                vm.quizFactory.startQuiz = slide.startQuiz; 
                vm.quizFactory.buttonText = slide.buttonText;
            }
        }

        function backToAllQuizzes () {
            vm.quizFactory.margin = 0; 
            vm.quizFactory.questionCount = 0; 
            vm.quizFactory.startQuiz = false; 
            vm.quizFactory.buttonText = 'START QUIZ!';
            vm.quizFactory.activeQuiz = null;
            localStorage.removeItem('quiz');
            localStorage.removeItem('slide');
        }
    }

})();