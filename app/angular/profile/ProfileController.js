(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['profileFactory', 'scrollFactory'];

    function ProfileController(profileFactory, scrollFactory) {
        var vm = this;
        vm.hideProfile = hideProfile;
        vm.goToElement = goToElement;
        vm.isVisible = profileFactory.isVisible;

        function profileInit() {
            vm.profile = profileFactory.getProfile();
            console.log('init');
        };


        console.log(vm.profile);
        profileFactory.registerObserverCallback(profileInit);
        profileFactory.updateProfile();


        function hideProfile() {
            profileFactory.hideProfile();
        }

        function goToElement (elemID) {
            scrollFactory.scroll(elemID);
        }
    }

})();
