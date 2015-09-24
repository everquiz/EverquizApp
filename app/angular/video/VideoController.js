(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('VideoController', VideoController);

    VideoController.$inject = ['$scope', 'scrollFactory'];

    function VideoController($scope, scrollFactory) {

        var vm = this;
        vm.goToElement = goToElement;
        vm.videoOpened = false;
        vm.showVideo = showVideo;
        window.onclick = hideVideo;

        function goToElement(elemID) {
            scrollFactory.scroll(elemID);
        }

        function showVideo(event) {
            vm.videoOpened = true;
            event.stopPropagation();
        }

        function hideVideo() {
            if (vm.videoOpened) {
                vm.videoOpened = false;
                $scope.$apply();
            }
        }
    }
})();