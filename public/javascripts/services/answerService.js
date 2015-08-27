app.service('answerService', function ($http) {
  var _answers = [];
  this.answers = _answers;

  this.getAllByQuestion = function(question) {
    $http.get('/api/v1/Answers?question=' + question._id).success(function(data) {
      angular.copy(data, _answers);
    });
    return _answers;
  };

  this.get = function(id) {
    return $http.get('/api/v1/Answers/' + id).then(function(res) {
      return res.data;
    });
  };

  this.create = function(answer) {
    return $http.post('/api/v1/Answers', answer).success(function(data) {
      _answers.push(data);
    })
  };

  // this.unactive = function(answer) {
  //   answer.status = 0;
  //   return $http.put('/api/v1/Answers/' + answer._id, answer);
  // };

  this.update = function(answer) {
    return $http.put('/api/v1/Answers/' + answer._id, answer);
  };
});
