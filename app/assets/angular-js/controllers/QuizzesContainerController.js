(function() {
    'use strict';

    angular
        .module('everquizApp')
        .controller('QuizzesContainerController', QuizzesContainerController);

    QuizzesContainerController.$inject = ['quizService'];

    function QuizzesContainerController (quizService) {

        var vm = this;
        vm.quizService = quizService;
    }

})();