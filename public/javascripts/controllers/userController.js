app.controller('UserCtrl', [
          '$scope','userService', 'user', 'noteService',
  function($scope,  userService,   user,   noteService){
    $scope.notes = user.notes;
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

    $scope.editNote = function(note) {
      $scope.title = note.title;
      $scope.text = note.text;
      $scope.id = note._id;
    }

    $scope.addNote = function() {
      if((!$scope.title || $scope.title === '')
        || (!$scope.text || $scope.text === '')) { return; }
      if (!$scope.id || $scope.id === '') {
        var note = {};
        note.title = $scope.title;
        note.text = $scope.text;
        user.notes.push(note);
        userService.update(user);
      } else {
        var notes = user.notes,
            i = 0,
            length = notes.length;
        for (; i < length; i++) {
          if(notes[i]._id === $scope.id) {
            notes[i].title = $scope.title;
            notes[i].text = $scope.text;
            break;
          }
        };
        userService.update(user);
      }
    };

    $scope.removeNote = function(note) {
      if (confirm('Do you want to delete ' + note.title + ' ?')) {
        var notes = user.notes,
            i = 0,
            length = notes.length;
        for (; i < length; i++) {
          if(notes[i]._id === note._id) {
            notes.splice(i, 1);
            break;
          }
        };
        userService.update(user);
      };
    };
}]);