app.service('answerService',['$http', 'questionService', function ($http, questionService) {
  var _answers = [];
  this.answers = _answers;

  this.get = function(id) {
    return $http.get('/api/v1/Answers/' + id).then(function(res) {
      return res.data;
    });
  };

  this.create = function(answer, question) {
    console.log('answer');
    console.log(answer);
    console.log('question');
    console.log(question);
    return $http.post('/api/v1/Answers', answer).success(function(data) {
      _answers.push(data);
      question.answers.push(data);
      console.log('question');
      console.log(question);
      questionService.updateFull(question);
    })
  };

  this.update = function(answer) {
    var id = answer.id || answer._id;
    return $http.get('/api/v1/Answers/' + id).success(function(data) {
      var answerUpdate = data;
      answerUpdate.text = answer.text;
      answerUpdate.editedAt = new Date;
      answerUpdate.correct = answer.correct;
      return $http.put('/api/v1/Answers/' + answerUpdate._id, answerUpdate)
      .success(function(data) {
        // ToDo need to update _answers array
      });
    });
  };

  this.remove = function(answer, question) {
    // if (question._id !== answer.question) {
    //   return false;
    // };
    return $http.delete('/api/v1/Answers/' + answer._id, answer).success(function(data) {
      _answers.splice(_answers.indexOf(answer), 1);
      var answerPos = question.answers.indexOf(data);
      question.answers.splice(answerPos, 1);
      questionService.updateFull(question);
    });
  };
}]);
