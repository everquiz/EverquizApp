(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('NavController', NavController);

    NavController.$inject = ['authFactory', 'profileFactory', 'notesService', '$state', 'scrollFactory', 'quizFactory'];

    function NavController(authFactory, profileFactory, notesService, $state, scrollFactory, quizFactory) {

        var vm = this;
        vm.isLoggedIn = authFactory.isLoggedIn;
        vm.currentUser = authFactory.currentUser;
        vm.logOut = logOut;
        vm.showProfile = showProfile;
        vm.hideProfile = hideProfile;
        vm.showNotes = showNotes;
        vm.isProfileVisible = profileFactory.isVisible;
        vm.toggleProfile = toggleProfile;
        vm.goHome = goHome;
        vm.goToElement = goToElement;

        if (vm.isLoggedIn()) {
            vm.showNotes();
        }

        function logOut() {
            profileFactory.hideProfile();
            notesService.hideNotes();
            authFactory.logOut();
            quizFactory.resetSlider();
            $state.go($state.current, {}, {reload: true});
        }

        function showProfile() {
            profileFactory.showProfile();
        }

        function hideProfile() {
            profileFactory.hideProfile();
        }

        function toggleProfile() {
            profileFactory.toggleProfile();
        }

        function showNotes() {
            notesService.showNotes();
        }

        function goHome() {
            profileFactory.hideProfile();
        }

        function goToElement(elemID) {
            scrollFactory.scroll(elemID);
        }
    }

})();
