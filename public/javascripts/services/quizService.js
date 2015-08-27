app.service('quizService', function ($http) {
  var _quizzes = [];
  this.quizzes = _quizzes;
  
  this.getAll = function() {
    return $http.get('/api/v1/Quizzes').success(function(data) {
      angular.copy(data, _quizzes);
    });
  };

  // this.get = function(id) {
  //   return $http.get('/api/v1/Users/' + id).then(function(res) {
  //     return res.data;
  //   });
  // };

  this.create = function(quiz) {
    return $http.post('/api/v1/Quizzes', quiz).success(function(data) {
      _quizzes.push(data);
    })
  };

  // this.remove = function(user) {
  //   return $http.delete('/api/v1/Users/' + user._id, user).success(function(data) {
  //     _users.splice(_users.indexOf(user), 1);
  //   })
  // };

  // this.update = function(user) {
  //   console.log(user)
  //   return $http.put('/api/v1/Users/' + user._id, user);
  // };

  // this.addNote= function(user, note) {
  //   return $http.post('/api/v1/Users/' + user._id + '/Notes/', note);
  // };
});