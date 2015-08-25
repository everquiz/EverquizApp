app.service('postService', function ($http) {
  var _posts = [];
  this.posts = _posts;
  
  this.getAll = function() {
    return $http.get('/posts').success(function(data) {
      angular.copy(data, _posts);
    });
  };

  this.create = function(post) {
    return $http.post('/posts', post).success(function(data) {
      _posts.push(data);
    })
  };

  this.upvote = function(post) {
    return $http.put('/posts/' + post._id + '/upvote')
      .success(function(data) {
        post.upvotes += 1;
      })
  };

  this.get = function(id) {
    return $http.get('/posts/' + id).then(function(res) {
      return res.data;
    });
  };

  this.addComment = function(id, comment) {
    return $http.post('/posts/' + id + '/comments/', comment);
  }
});