(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('NavController', NavController);

    NavController.$inject = ['authFactory', 'profileFactory', 'notesService', '$state', 'scrollFactory'];

    function NavController(authFactory, profileFactory, notesService, $state, scrollFactory) {

        var vm = this;
        vm.isLoggedIn = authFactory.isLoggedIn;
        vm.currentUser = authFactory.currentUser;
        vm.logOut = logOut;
        vm.showProfile = showProfile;
        vm.showNotes = showNotes;
        vm.isProfileVisible = profileFactory.isVisible;
        vm.toggleProfile = toggleProfile;
        vm.goHome = goHome;
        vm.goToElement = goToElement;

        if (vm.isLoggedIn()) vm.showNotes();

        function logOut() {
            console.log('log of');
            profileFactory.hideProfile();
            notesService.hideNotes();
            authFactory.logOut();
            $state.go('home');
        }

        function showProfile() {
            profileFactory.showProfile();
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

        function goToElement (elemID) {
            scrollFactory.scroll(elemID);
        }
    }

})();
