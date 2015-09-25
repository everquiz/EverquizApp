(function() {
  'use strict';

  angular
      .module('everquizApp')
      .controller('UsersController', UsersController);

  UsersController.$inject = ['userService', 'authFactory'];

  function UsersController(userService, authFactory) {

    var vm = this;
    vm.users = userService.users;
    vm.addUser = addUser;
    vm.editUser = editUser;

    function addUser() {
      if((!vm.user.name || vm.user.name === '')
          || (!vm.user.email || vm.user.email === '')) 
        { return; }
      if (!vm.user._id || vm.user._id === '') {
        userService.create(vm.user);
      } else {
        userService.update(vm.user);

      }
      vm.user = {};
      vm.formTitle = 'Add new user';
      vm.user.emailDis = false;
    };

    function editUser(user) {
      vm.user = user;
      vm.formTitle = 'Edit user';
      vm.user.emailDis = true;
    };
  }

})();
