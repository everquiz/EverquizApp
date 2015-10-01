(function() {
    'use strict';

    angular
        .module('everquizApp')
        .controller('ResultController', ResultController);

    ResultController.$inject = ['quizFactory', 'scrollFactory', 'randomPhraseFactory'];

    function ResultController (quizFactory, scrollFactory, randomPhraseFactory) {

        var vm = this;
        vm.quizFactory = quizFactory;
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