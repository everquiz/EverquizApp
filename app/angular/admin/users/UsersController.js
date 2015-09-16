(function() {
  'use strict';

  angular
      .module('everquizApp')
      .controller('UsersController', UsersController);

  UsersController.$inject = ['userService'];

  function UsersController(userService) {

    var vm = this;
    vm.test = 'Hello world!';
    vm.users = userService.users;
    vm.addUser = addUser;
    vm.removeUser = removeUser;
    vm.editUser = editUser;

    function addUser() {
      if((!vm.user.name || vm.user.name === '')
          || (!vm.user.email || vm.user.email === '')
      // || (!vm.user.password || vm.user.password === '')
      // || (!vm.user.passwordRepeat || vm.user.passwordRepeat === '')
      ) { return; }
      if (!vm.user._id || vm.user._id === '') {
        // userService.create({
        //   name: vm.name,
        //   email: vm.email,
        //   password: vm.password
        // });
      } else {
        console.log(vm.user);
        userService.update(vm.user);
      }

      vm.user = '';
    };

    function removeUser(user) {
      if (confirm('Do you want to delete ' + user.name + ' ?')) {
        userService.remove(user);
      };
    };

    function editUser(user) {
      vm.user = user;
    };
  }

})();
