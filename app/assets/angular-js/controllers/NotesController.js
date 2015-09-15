(function() {
  'use strict';

  angular
      .module('everquizApp')
      .controller('NotesController', NotesController);

  NotesController.$inject = ['authFactory'];

  function NotesController(authFactory) {

    var vm = this;
    vm.isLoggedIn = authFactory.isLoggedIn;
  }

})();
