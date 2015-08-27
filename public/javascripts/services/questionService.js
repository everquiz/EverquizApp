app.service('questionService', function ($http) {
  var _questions = [];
  this.questions = _questions;

  this.getAllByQuiz = function(quiz) {
    $http.get('/api/v1/Questions?quiz=' + quiz._id).success(function(data) {
      angular.copy(data, _questions);
    });
    return _questions;
  };

  // this.get = function(id) {
  //   return $http.get('/api/v1/Questions/' + id).then(function(res) {
  //     return res.data;
  //   });
  // };

  this.create = function(question) {
    return $http.post('/api/v1/Questions', question).success(function(data) {
      _questions.push(data);
    })
  };

  // this.unactive = function(question) {
  //   question.status = 0;
  //   return $http.put('/api/v1/Questions/' + question._id, question);
  // };

  this.update = function(question) {
    return $http.put('/api/v1/Questions/' + question._id, question);
  };
});
