app.controller('UserCtrl', [
          '$scope','userService', 'user', 'noteService',
  function($scope,  userService,   user,   noteService){
    $scope.notes = noteService.getAllByUser(user);
    $scope.user = user;
    console.log($scope.notes);
    $scope.addNote = function(){
      if((!$scope.title || $scope.title === '')
        || (!$scope.text || $scope.text === '')) { return; }
      var note = {};
      note.title = $scope.title;
      note.text = $scope.text;
      note.user = $scope.user;
      noteService.create(note);
      $scope.title = '';
      $scope.text = '';
    };
}]);