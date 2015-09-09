app.service('quizService', function ($http) {
  // For admin
  var _quizzes = [];
  this.quizzes = _quizzes;
  
  // For user
  var _self = {};
  _self.quizzes = [];
  /**
   * For user section
   */
  this.getQuizzes = function() {
    $http.get('/api/v1/Quizzes').then(function(res) {
      console.log('res.data');
      console.log(res.data);
      angular.copy(res.data, _self.quizzes);
      console.log('_quizzes');
      console.log(_self.quizzes);

    });
    console.log('_quizzes2');
    console.log(_self.quizzes);
    return _self.quizzes;
  }

  /**
   * For admin section
   */
  this.getAll = function() {
    return $http.get('/api/v1/Quizzes').success(function(data) {
      angular.copy(data, _quizzes);
      console.log('data');
      console.log(data);
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