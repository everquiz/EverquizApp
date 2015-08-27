app.controller('UserCtrl', [
          '$scope','userService', 'user', 'noteService',
  function($scope,  userService,   user,   noteService){
    $scope.notes = noteService.getAllByUser(user);
    $scope.user = user;
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

    $scope.editNote = function(note, user) {
      $scope.title = note.title;
      $scope.text = note.text;
      $scope.id = note._id;
    }

    $scope.addNote = function() {
      if((!$scope.title || $scope.title === '')
        || (!$scope.text || $scope.text === '')) { return; }
      if (!$scope.id || $scope.id === '') {
        noteService.create({
          title: $scope.title,
          text: $scope.text
        });
      } else {
        noteService.get($scope.id).then(function(note) {
          note.title = $scope.title;
          note.text = $scope.text;
          noteService.update(note, user);
          $scope.title = '';
          $scope.text = '';
        });
      }
    };

    $scope.removeNote = function(note, user) {
      if (confirm('Do you want to delete ' + note.title + ' ?')) {
        noteService.remove(note, user);
      };
    };
}]);