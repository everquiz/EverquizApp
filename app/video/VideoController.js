(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('VideoController', VideoController);

    VideoController.$inject = ['$scope', 'scrollFactory'];

    function VideoController($scope, scrollFactory) {

        var vm = this;
        var video = document.getElementById('video');

        vm.goToElement = goToElement;
        vm.videoOpened = false;
        vm.showVideo = showVideo;
        window.onclick = hideVideo;

        function goToElement (elemID) {
            scrollFactory.scroll(elemID);
        }

        function showVideo(event) {
            vm.videoOpened = true;
            setTimeout(function () {
                document.body.style.overflow = "hidden";
            }, 150);
            event.stopPropagation();
        }

        function hideVideo() {
            if (vm.videoOpened) {
                vm.videoOpened = false;
                document.body.style.overflow = "";
                $scope.$apply();
            }
        }
    }
})();