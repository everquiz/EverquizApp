(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['profile', 'profileFactory'];

    function ProfileController(profile, profileFactory) {
        var vm = this;
        vm.profile = profile;
        vm.isVisible = profileFactory.isVisible;
    }

})();
