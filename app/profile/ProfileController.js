(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['profileFactory', 'scrollFactory', 'ngDialog', 'achievementService'];

    function ProfileController(profileFactory, scrollFactory, ngDialog, achievementService) {
        var vm = this;
        vm.hideProfile = hideProfile;
        vm.goToElement = goToElement;
        vm.isVisible = profileFactory.isVisible;
        vm.clickToOpen = clickToOpen;
        vm.achievementService = achievementService;

        function profileInit() {
            vm.profile = profileFactory.getProfile();
            vm.achievementService.get('561450e8208fa4d013bfd00a');
        }

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
                className: 'ngdialog-theme-chart',
                controller: 'ChartController',
                controllerAs: 'ChartCtrl'

            });
        };
    }

})();
