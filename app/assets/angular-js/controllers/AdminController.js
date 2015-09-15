(function() {
    'use strict';

    angular
        .module('everquizApp')
        .controller('AdminController', AdminController);

    function AdminController() {
        var vm = this;
        vm.test = 'Hello admin!';
        vm.items = ['quizzes', 'users'];
        vm.selection = vm.items[0];
        // vm.users = userService.users;
        // vm.users = quizService.quizzes;
    }

})();
