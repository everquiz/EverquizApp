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
        vm.logInGoogle = authFactory.logInGoogle;
        vm.register = register;
        vm.dataLoaded = true;


        function register() {
            vm.dataLoaded = false;
            console.log('register ctrl');

            authFactory.register(vm.user).then(function () {
                console.log('register ctrl then');
                profileFactory.addAchievement('5614d7cd60a7a12614a331b8');
                vm.dataLoaded = true;

                $state.go('home');
                vm.dataLoaded = true;
            }, function (error) {
                vm.error = error;
                vm.dataLoaded = true;
            });
        }


        function logIn() {
            vm.dataLoaded = false;
            authFactory.logIn(vm.user).error(function (error) {
                vm.error = error;
                vm.dataLoaded = true;
            }).then(function () {
                var payload = JSON.parse($window.atob(authFactory.getToken().split('.')[1]));
                if (payload.roles[0] === 'admin') {
                    $state.go('admin.quizzes');
                } else if (payload.roles[0] === 'user') {
                    $state.go('home');
                }
                vm.dataLoaded = true;
            });
        }
    }

})();
