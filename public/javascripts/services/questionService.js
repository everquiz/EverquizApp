app.service('questionService',['$http', 'quizService',  function ($http, quizService) {
  var _questions = [];
  this.questions = _questions;

  this.get = function(id) {
    return $http.get('/api/v1/Questions/' + id + '?populate=answers').then(function(res) {
      return res.data;
    });
  };

  this.create = function(question, quiz) {
    return $http.post('/api/v1/Questions', question).success(function(data) {
      _questions.push(data);
      quiz.questions.push(data);
      quizService.update(quiz);
    });
  };

  this.remove = function(question, quiz) {
    if (quiz._id !== question.quiz) {
      return false;
    };
    return $http.delete('/api/v1/Questions/' + question._id, question).success(function(data) {
      _questions.splice(_questions.indexOf(question), 1);
      var questionPos = quiz.questions.indexOf(data);
      quiz.questions.splice(questionPos, 1);
      quizService.update(quiz);
    });
  };

  this.update = function(question) {
    var id = question.id || question._id;
    return $http.get('/api/v1/Questions/' + id).success(function(data) {
      var questionUpdate = data;
      questionUpdate.text = question.text;
      questionUpdate.editedAt = new Date;
      questionUpdate.answers = question.answers;
      return $http.put('/api/v1/Questions/' + questionUpdate._id, questionUpdate).success(function(data) {
        // ToDo need to update _questions array
      });
    });
  };

  this.updateFull = function(question) {
    return $http.put('/api/v1/Questions/' + question._id, question);
  };
}]);
