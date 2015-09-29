(function() {
    'use strict';

    angular
        .module('everquizApp')
        .controller('QuizzesContainerController', QuizzesContainerController);

    QuizzesContainerController.$inject = ['quizService'];

    function QuizzesContainerController (quizService) {

        var vm = this,
            localQuiz = localStorage.getItem('quiz');
        vm.quizService = quizService;
        vm.isVisible = quizService.isVisible;
        if (localQuiz) {
            vm.quizService.activeQuiz = JSON.parse(localQuiz)._id;
            var slide = JSON.parse(slide);
        };
    }

})();