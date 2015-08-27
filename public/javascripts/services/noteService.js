app.service('noteService', function ($http) {
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

  this.create = function(note) {
    return $http.post('/api/v1/Notes', note).success(function(data) {
      _notes.push(data);
    });
  };

  this.update = function(note, user) {
    if (user.id !== note.user) {
      return false;
    };
    return $http.put('/api/v1/Notes/' + note._id, note);
  };

  this.remove = function(note, user) {
    if (user._id !== note.user) {
      return false;
    };
    return $http.delete('/api/v1/Notes/' + note._id, note).success(function(data) {
      _notes.splice(_notes.indexOf(note), 1);
    })
  };
});