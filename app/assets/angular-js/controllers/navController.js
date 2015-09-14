app.controller('NavCtrl', [
'$scope',
'authFactory',
'profileFactory',
function($scope, authFactory, profileFactory){
  $scope.isLoggedIn = authFactory.isLoggedIn;
  $scope.currentUser = authFactory.currentUser;
  $scope.logOut = logOut;
  $scope.showProfile = showProfile;
  $scope.goHome = goHome;

  function logOut() {
    profileFactory.hideProfile();
    authFactory.logOut();
  }

  function showProfile() {
    profileFactory.showProfile();
  }

  function goHome() {
    profileFactory.hideProfile();
  }
}]);

