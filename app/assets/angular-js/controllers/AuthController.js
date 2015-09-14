(function() {
	'use strict';

	angular
		.module('everquizApp')
		.controller('AuthController', AuthController);

	AuthController.$inject = ['$state', '$window', 'authFactory'];

	function AuthController($state,   $window,   authFactory) {
		
		var vm = this;
		vm.user = {};
		// admin
		// vm.user.email = 'admin@admin.com';
		// vm.user.password = 'admin';
		// user
		vm.user.email = '2@2';
		vm.user.password = '2';
		vm.logIn = logIn;
		vm.isLogged = isLogged;
		vm.isAdmin = isAdmin;
		vm.register = register;

		function register(){
			authFactory.register(vm.user).error(function(error){
				vm.error = error;
			}).then(function(){
				$state.go('home');
			});
		};

		function logIn(){
			authFactory.logIn(vm.user).error(function(error){
				vm.error = error;
			}).then(function(){
				var payload = JSON.parse($window.atob(authFactory.getToken().split('.')[1]));
				if (payload.roles[0] === 'admin') {
					$state.go('admin')
				} else if (payload.roles[0] === 'user') {
					$state.go('home');
				};
			});
		};

		function isLogged() {
			// body...
		};

		function isAdmin() {
			alert('no access');
			return false;
		};
	}

})();
