app.service('quizService', function ($http) {
  var _quizzes = [];
  this.quizzes = _quizzes;
  
  this.getAll = function() {
    return $http.get('/api/v1/Quizzes').success(function(data) {
      angular.copy(data, _quizzes);
    });
  };

  this.get = function(id) {
    return $http.get('/api/v1/Quizzes/' + id + '?populate=questions').then(function(res) {
      return res.data;
    });
  };

  this.create = function(quiz) {
    return $http.post('/api/v1/Quizzes', quiz).success(function(data) {
      _quizzes.push(data);
    })
  };

  this.unactive = function(quiz) {
    quiz.status = 0;
    return $http.put('/api/v1/Quizzes/' + quiz._id, quiz);
  };

  this.active = function(quiz) {
    quiz.status = 1;
    return $http.put('/api/v1/Quizzes/' + quiz._id, quiz);
  };

  this.update = function(quiz) {
    return $http.put('/api/v1/Quizzes/' + quiz._id, quiz);
  };
});