(function() {
    'use strict';

    angular
        .module('everquizApp')
        .controller('ResultController', ResultController);

    ResultController.$inject = ['quizService', 'scrollFactory', 'randomPhraseFactory'];

    function ResultController (quizService, scrollFactory, randomPhraseFactory) {

        var vm = this;
        vm.quizService = quizService;
        vm.goToElement = goToElement;
        vm.getRandomPhrase = getRandomPhrase;

        function getRandomPhrase() {
            return randomPhraseFactory.randomPhrase();
        }

        function goToElement (elemID) {
            scrollFactory.scroll(elemID);
        }
    }
})();