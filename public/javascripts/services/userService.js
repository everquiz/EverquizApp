app.service('userService', function ($http) {
  var _users = [];
  this.users = _users;
  
  this.getAll = function() {
    return $http.get('/api/v1/Users').success(function(data) {
      angular.copy(data, _users);
    });
  };

  this.create = function(user) {
    return $http.post('/api/v1/Users', user).success(function(data) {
      _users.push(data);
    })
  };

  this.remove = function(user) {
    return $http.delete('/api/v1/Users', user).success(function(data) {
      _users.splice(data);
    })
  };
});