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
        vm.achievements = [];
        achievementService.getAll().then(function (res) {
            angular.copy(res, vm.achievements);
        })

        function profileInit() {
            vm.profile = profileFactory.getProfile();
            console.log('vm.achievements', vm.achievements)
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
