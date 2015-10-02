(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('VideoController', VideoController);

    VideoController.$inject = ['$scope', 'scrollFactory'];

    function VideoController($scope) {

        var vm = this;
        var video = document.getElementById('video');

        vm.videoOpened = false;
        vm.showVideo = showVideo;
        window.onclick = hideVideo;

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
                document.body.style.overflow = "auto";
                //video.scrollIntoView();
                $scope.$apply();
            }
        }
    }
})();