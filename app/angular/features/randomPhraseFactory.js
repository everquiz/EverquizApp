(function () {
    'use strict';

    angular
        .module('everquizApp')
        .factory('randomPhraseFactory', randomPhraseFactory);

    function randomPhraseFactory() {
        return {
            randomPhrase: randomPhrase
        };

        function randomPhrase() {
            var phrases = ['hello', 'hi', 'good morning', 'welcome'];
            return phrases[Math.floor(Math.random() * phrases.length)];
        }
    }
})();
