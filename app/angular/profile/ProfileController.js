(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['profile', 'profileFactory', 'scrollFactory'];

    function ProfileController(profile, profileFactory, scrollFactory) {
        var vm = this;
        vm.profile = profile;
        vm.isVisible = profileFactory.isVisible;
        vm.hideProfile = hideProfile;
        vm.goToElement = goToElement;

        function hideProfile() {
            profileFactory.hideProfile();
        }

        function goToElement (elemID) {
            scrollFactory.scroll(elemID);
        }
    }

})();
