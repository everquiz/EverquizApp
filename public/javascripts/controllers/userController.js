app.controller('UserCtrl', [
          '$scope', 'userService', 'user',
  function($scope,   userService,   user){
    $scope.user = user;

    $scope.addNote = function(){
      if((!$scope.title || $scope.title === '')
        || (!$scope.text || $scope.text === '')) { return; }
      userService.addNote(user, {
        title: $scope.title,
        text: $scope.text,
        user: user
      }).success(function(note) {
        $scope.user.notes.push(note);
      });
      $scope.title = '';
      $scope.text = '';
    };

}]);