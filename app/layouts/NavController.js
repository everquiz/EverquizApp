(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('NavController', NavController);

    NavController.$inject = ['authFactory', 'profileFactory', 'notesService', 'quizFactory', '$state', 'scrollFactory'];

    function NavController(authFactory, profileFactory, notesService, quizFactory, $state, scrollFactory) {

        var vm = this;
        vm.isLoggedIn = authFactory.isLoggedIn;
        vm.currentUser = authFactory.currentUser;
        vm.logOut = logOut;
        vm.showProfile = showProfile;
        vm.hideProfile = hideProfile;
        vm.showNotes = showNotes;
        vm.showQuizzes = showQuizzes;
        vm.isProfileVisible = profileFactory.isVisible;
        vm.toggleProfile = toggleProfile;
        vm.goHome = goHome;
        vm.goToElement = goToElement;

        if (vm.isLoggedIn()) {
            vm.showNotes();
            vm.showQuizzes();
        }

        function logOut() {
            profileFactory.hideProfile();
            notesService.hideNotes();
            quizFactory.hideQuizzes();
            authFactory.logOut();
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

        function showQuizzes(){
            quizFactory.showQuizzes();
        }

        function goHome() {
            profileFactory.hideProfile();
        }

        function goToElement(elemID) {
            scrollFactory.scroll(elemID);
        }
    }

})();
