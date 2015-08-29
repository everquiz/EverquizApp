app.controller('AuthCtrl', [
	'$scope', '$state', 'authFactory',
	function($scope, $state, authFactory){
			$scope.user = {};

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
		  			$state.go('home');
				});
			};
}]);