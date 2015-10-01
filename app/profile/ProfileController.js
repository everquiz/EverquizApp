(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['profileFactory', 'scrollFactory', 'ngDialog'];

    function ProfileController(profileFactory, scrollFactory, ngDialog) {
        var vm = this;
        vm.hideProfile = hideProfile;
        vm.goToElement = goToElement;
        vm.isVisible = profileFactory.isVisible;
        vm.clickToOpen = clickToOpen;

        function profileInit() {
            vm.profile = profileFactory.getProfile();
        };

        profileFactory.registerObserverCallback(profileInit);
        profileFactory.updateProfile();

        function hideProfile() {
            profileFactory.hideProfile();
        }

        function goToElement (elemID) {
            scrollFactory.scroll(elemID);
        }

        function clickToOpen() {
            ngDialog.open({
                template: "charts/chart.html",
                controller: 'ChartController',
                controllerAs: 'ChartCtrl'
            });
        };
    }

})();
