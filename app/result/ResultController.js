(function() {
    'use strict';

    angular
        .module('everquizApp')
        .controller('ResultController', ResultController);

    ResultController.$inject = ['resultFactory', 'scrollFactory', 'randomPhraseFactory'];

    function ResultController (resultFactory, scrollFactory, randomPhraseFactory) {

        var vm = this;
        vm.resultFactory = resultFactory;
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