app
  .controller('NotesController', [
    '$scope',
    'authFactory',
    NotesController
  ]);

function NotesController ($scope, authFactory) {
  $scope.isLoggedIn = authFactory.isLoggedIn;
}