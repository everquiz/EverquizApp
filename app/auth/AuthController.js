(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['$state', '$window', 'authFactory'];

    function AuthController($state, $window, authFactory) {

        var vm = this;
        vm.user = {};
        vm.logIn = logIn;
        vm.logInGoogle = authFactory.logInGoogle;
        vm.isAdmin = isAdmin;
        vm.register = register;

        function register() {
            authFactory.register(vm.user).error(function (error) {
                vm.error = error;
            }).then(function () {
                $state.go('home');
            });
        }


        function logIn() {
            authFactory.logIn(vm.user).error(function (error) {
                vm.error = error;
            }).then(function () {
                var payload = JSON.parse($window.atob(authFactory.getToken().split('.')[1]));
                if (payload.roles[0] === 'admin') {
                    $state.go('admin.quizzes');
                } else if (payload.roles[0] === 'user') {
                    $state.go('home');
                }
            });
        }

        function isAdmin() {
            alert('no access');
            return false;
        }
    }

})();
