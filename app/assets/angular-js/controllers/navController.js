(function() {
  'use strict';

  angular
      .module('everquizApp')
      .controller('NavController', NavController);

  NavController.$inject = ['authFactory', 'profileFactory'];

  function NavController(authFactory, profileFactory) {

    var vm = this;
    vm.isLoggedIn = authFactory.isLoggedIn;
    vm.currentUser = authFactory.currentUser;
    vm.logOut = logOut;
    vm.showProfile = showProfile;
    vm.goHome = goHome;

    function logOut() {
      profileFactory.hideProfile();
      authFactory.logOut();
    }

    function showProfile() {
      profileFactory.showProfile();
    }

    function goHome() {
      profileFactory.hideProfile();
    }
  }
  
})();