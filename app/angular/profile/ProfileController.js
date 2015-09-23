(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['profile', 'profileFactory', 'scrollFactory', 'lastActions'];

    function ProfileController(profile, profileFactory, scrollFactory, lastActions) {
        var vm = this;
        vm.profile = profile;
        vm.isVisible = profileFactory.isVisible;
        vm.hideProfile = hideProfile;
        vm.goToElement = goToElement;
        vm.lastActions = lastActions;


        function hideProfile() {
            profileFactory.hideProfile();
        }

        function goToElement (elemID) {
            scrollFactory.scroll(elemID);
        }
    }

})();
