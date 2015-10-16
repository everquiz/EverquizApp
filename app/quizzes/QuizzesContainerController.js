(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('QuizzesContainerController', QuizzesContainerController);

    QuizzesContainerController.$inject = ['quizFactory', 'resultFactory', '$window'];

    function QuizzesContainerController(quizFactory, resultFactory, $window) {

        var vm = this;
        var localQuiz = $window.localStorage.getItem('quiz');
        vm.backToAllQuizzes = quizFactory.resetSlider;
        vm.quizFactory = quizFactory;
        vm.resultFactory = resultFactory;
        if (localQuiz) {
            quizFactory.activeQuiz = JSON.parse(localQuiz)._id;
            var slide = JSON.parse($window.localStorage.getItem('slide'));
            if (slide) {
                quizFactory.setSlider(slide);
            }
        }
    }
})();