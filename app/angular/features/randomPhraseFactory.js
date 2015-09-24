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
            var phrases = ['Hello!', 'Hi!', 'Good Morning!', 'Welcome!'];
            return phrases[Math.floor(Math.random() * phrases.length)];
        }
    }
})();
