(function() {
    'use strict';

    angular
        .module('everquizApp')
        .controller('AboutController', AboutController);

    AboutController.$inject = ['scrollFactory'];

    function AboutController (scrollFactory) {

        var vm = this;
        vm.goToElement = goToElement;
        
        function goToElement (elemID) {
            scrollFactory.scroll(elemID);
        }
    }
})();