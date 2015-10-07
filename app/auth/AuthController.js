(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['$state', '$window', 'authFactory', 'profileFactory'];

    function AuthController($state, $window, authFactory, profileFactory) {

        var vm = this;
        vm.user = {};
        vm.logIn = logIn;
        vm.isAdmin = isAdmin;
        vm.register = register;

        function register() {
            authFactory.register(vm.user).error(function (error) {
                vm.error = error;
            }).then(function () {
                profileFactory.addAchievement('5614d7cd60a7a12614a331b8');
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
