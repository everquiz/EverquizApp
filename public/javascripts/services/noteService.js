app.service('noteService', function ($http) {
  var _notes = [];
  this.notes = _notes;
  
  this.getAllByUser = function(user) {
    $http.get('/api/v1/Notes?user=' + user._id).success(function(data) {
      angular.copy(data, _notes);
    });
    return _notes;
  };

  // this.get = function(id) {
  //   return $http.get('/api/v1/Users/' + id).then(function(res) {
  //     return res.data;
  //   });
  // };

  this.create = function(note) {
    return $http.post('/api/v1/Notes', note).success(function(data) {
      _notes.push(data);
    });
  };

  // this.remove = function(user) {
  //   return $http.delete('/api/v1/Users/' + user._id, user).success(function(data) {
  //     _users.splice(_users.indexOf(user), 1);
  //   })
  // };

  // this.update = function(user) {
  //   console.log(user)
  //   return $http.put('/api/v1/Users/' + user._id, user);
  // }

  // this.addNote= function(user, note) {
  //   return $http.post('/api/v1/Users/' + user._id + '/Notes/', note);
  // };
});