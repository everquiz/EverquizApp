(function() {
  'use strict';

  angular
      .module('everquizApp')
      .controller('NavController', NavController);

  NavController.$inject = ['authFactory', 'profileFactory', 'notesService', '$state'];

  function NavController(authFactory, profileFactory, notesService, $state) {

    var vm = this;
    vm.isLoggedIn = authFactory.isLoggedIn;
    vm.currentUser = authFactory.currentUser;
    vm.logOut = logOut;
    vm.showProfile = showProfile;
    vm.showNotes = showNotes;
    vm.isProfileVisible = profileFactory.isVisible;
    vm.toggleProfile = toggleProfile;
    vm.goHome = goHome;

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
  }
  
})();
