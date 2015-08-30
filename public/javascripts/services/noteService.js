app.service('noteService',['$http', 'userService', function ($http, userService) {
  var _notes = [];
  this.notes = _notes;
  
  this.getAllByUser = function(user) {
    $http.get('/api/v1/Notes?user=' + user._id).success(function(data) {
      angular.copy(data, _notes);
    });
    return _notes;
  };

  this.get = function(id) {
    return $http.get('/api/v1/Notes/' + id).then(function(res) {
      return res.data;
    });
  };

  this.create = function(note, user) {
    return $http.post('/api/v1/Notes', note).success(function(data) {
      _notes.push(data);
      user.notes.push(data);
      userService.update(user);
    });
  };

  this.update = function(note, user) {
    if (user !== note.user) {
      return false;
    };
    return $http.get('/api/v1/Notes/' + note.id).success(function(data) {
      var noteUpdate = data;
      noteUpdate.title = note.title;
      noteUpdate.text = note.text;
      noteUpdate.editedAt = new Date;
      return $http.put('/api/v1/Notes/' + noteUpdate._id, noteUpdate).success(function(data) {
        // ToDo need to update _notes array
      });
    });
  };

  this.remove = function(note, user) {
    if (user._id !== note.user) {
      return false;
    };
    return $http.delete('/api/v1/Notes/' + note._id, note).success(function(data) {
      _notes.splice(_notes.indexOf(note), 1);
      var notePos = user.notes.indexOf(data);
      user.notes.splice(notePos, 1);
      userService.update(user);
    })
  };
}]);