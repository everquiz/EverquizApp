app.controller('AuthCtrl', [
					'$scope', '$state', '$window', 'authFactory',
	function($scope,   $state,   $window,   authFactory){
			$scope.user = {};
			// admin
			// $scope.user.email = 'admin@admin.com';
			// $scope.user.password = 'admin';
			// user
			$scope.user.email = '2@2';
			$scope.user.password = '2';

			$scope.register = function(){
				authFactory.register($scope.user).error(function(error){
					$scope.error = error;
				}).then(function(){
					$state.go('home');
				});
			};
			$scope.logIn = function(){
				authFactory.logIn($scope.user).error(function(error){
		 	 		$scope.error = error;
				}).then(function(){
					var payload = JSON.parse($window.atob(authFactory.getToken().split('.')[1]));
					if (payload.roles[0] === 'admin') {
						$state.go('admin')
					} else if (payload.roles[0] === 'user') {
	  				$state.go('home');
					};
				});
			};

			$scope.isLogged = function() {
				// body...
			};

			$scope.isAdmin = function() {
				alert('no access');
				return false;
			};
}]);