app.controller('UserCtrl', [
          '$scope', 'user', 'noteService',
  function($scope,   user,   noteService){
    $scope.notes = user.notes;
    $scope.user = user;

    $scope.editNote = function(note) {
      $scope.title = note.title;
      $scope.text = note.text;
      $scope.id = note._id;
    }

    $scope.addNote = function() {
      if((!$scope.title || $scope.title === '')
        || (!$scope.text || $scope.text === '')) { return; }
      var note = {};
      if (!$scope.id || $scope.id === '') {
        note.title = $scope.title;
        note.text = $scope.text;
        note.user = user;
        noteService.create(note, user);
      } else {
        note.id = $scope.id;
        note.title = $scope.title;
        note.text = $scope.text;
        note.user = user;
        noteService.update(note, user);
        $scope.id = '';

      }
      $scope.title = '';
      $scope.text = '';
    };

    $scope.removeNote = function(note) {
      if (confirm('Do you want to delete ' + note.title + ' ?')) {
        noteService.remove(note, user);
      };
    };
}]);