app.service('userService', function ($http) {
  var _users = [];
  this.users = _users;
  
  this.getAll = function() {
    return $http.get('/api/v1/Users').success(function(data) {
      angular.copy(data, _users);
    });
  };

  this.get = function(id) {
    return $http.get('/api/v1/Users/' + id + '?populate=notes').then(function(res) {
      return res.data;
    });
  };

  // this.create = function(user) {
  //   return $http.post('/api/v1/Users', user).success(function(data) {
  //     _users.push(data);
  //   })
  // };

  // this.remove = function(user) {
  //   return $http.delete('/api/v1/Users/' + user._id, user).success(function(data) {
  //     _users.splice(_users.indexOf(user), 1);
  //   })
  // };

  this.update = function(user) {
    return $http.put('/api/v1/Users/' + user._id, user);
  };

  // ToDo delete??? don't remember for what it
  // this.addNote= function(user, note) {
  //   return $http.post('/api/v1/Users/' + user._id + '/Notes/', note);
  // };
});