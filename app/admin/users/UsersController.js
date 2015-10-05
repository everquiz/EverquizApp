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
    vm.formTitle = 'Add new user';
    vm.resetTitle = resetTitle;
    vm.modalToggle = modalToggle;

    function modalToggle() {
      var modal = document.getElementById('modal');
      console.log('modal', modal);
      if (modal.style.opacity == 0) {
        console.log('opacity 0')
        modal.style.display = 'block';
        modal.style.opacity = 1;
      } else {
        console.log('opacity 1')
        modal.style.opacity = 0;
        modal.style.display = 'none';
      }
    };

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

    function resetTitle () {
      vm.user = {};
      vm.formTitle = 'Add new user';
      vm.user.emailDis = false;
      vm.modalToggle();
    }
  }

})();
