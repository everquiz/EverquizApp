(function() {
  'use strict';

  angular
      .module('everquizApp')
      .controller('NavController', NavController);

  NavController.$inject = ['authFactory', 'profileFactory', 'notesService'];

  function NavController(authFactory, profileFactory, notesService) {

    var vm = this;
    vm.isLoggedIn = authFactory.isLoggedIn;
    vm.currentUser = authFactory.currentUser;
    vm.logOut = logOut;
    vm.showProfile = showProfile;
    vm.showNotes = showNotes;
    vm.goHome = goHome;

    if (vm.isLoggedIn()) vm.showNotes();

    function logOut() {
      profileFactory.hideProfile();
      notesService.hideNotes();
      authFactory.logOut();
    }

    function showProfile() {
      profileFactory.showProfile();
    }

    function showNotes() {
      notesService.showNotes();
    }

    function goHome() {
      profileFactory.hideProfile();
    }
  }
  
})();
