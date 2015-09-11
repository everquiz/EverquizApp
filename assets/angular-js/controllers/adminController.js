app.controller('AdminCtrl', [
          '$scope',
  function($scope){
    $scope.test = 'Hello admin!';
    $scope.items = ['quizzes', 'users'];
    $scope.selection = $scope.items[0];
    // $scope.users = userService.users;
    // $scope.users = quizService.quizzes;

}]);