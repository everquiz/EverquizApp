(function() {
    'use strict';

    angular
        .module('everquizApp')
        .controller('VideoController', VideoController);

    VideoController.$inject = ['scrollFactory'];

    function VideoController (scrollFactory) {

        var vm = this;
        vm.goToElement = goToElement;
        
        function goToElement (elemID) {
            scrollFactory.scroll(elemID);
        }
    }
})();