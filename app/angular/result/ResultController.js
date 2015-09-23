(function() {
    'use strict';

    angular
        .module('everquizApp')
        .controller('ResultController', ResultController);

    ResultController.$inject = ['quizService', 'scrollFactory'];

    function ResultController (quizService, scrollFactory) {

        var vm = this;
        vm.quizService = quizService;
        vm.goToElement = goToElement;

        function goToElement (elemID) {
            scrollFactory.scroll(elemID);
        }
    }
})();