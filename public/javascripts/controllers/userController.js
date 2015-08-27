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

    $scope.editNote = function(note, user) {
      $scope.title = note.title;
      $scope.text = note.text;
      $scope.id = note._id;
    }

    $scope.addNote = function() {
      if((!$scope.title || $scope.title === '')
        || (!$scope.text || $scope.text === '')) { return; }
      if (!$scope.id || $scope.id === '') {
        // noteService.create({
        //   name: $scope.name,
        //   email: $scope.email,
        //   password: $scope.password
        // });
      } else {
        noteService.get($scope.id).then(function(note) {
          note.title = $scope.title;
          note.text = $scope.text;
          console.log('title');
          console.log($scope.title);
          console.log('note');
          console.log(note);
          noteService.update(note, user);
          $scope.title = '';
          $scope.text = '';
        });
      }
      
      
    };
}]);