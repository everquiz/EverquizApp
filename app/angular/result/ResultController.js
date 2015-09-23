(function() {
    'use strict';

    angular
        .module('everquizApp')
        .controller('ResultController', ResultController);

    ResultController.$inject = ['quizService'];

    function ResultController (quizService) {

        var vm = this;
        vm.quizService = quizService;
    }
})();