(function() {
  'use strict'

  angular
      .module('everquizApp')
      .service('answerService', answerService);

  answerService.$inject = ['$http', 'questionService'];

  function answerService($http, questionService) {
    var _answers = [];
    this.answers = _answers;
    this.get = function (id) {
      return $http.get('/api/v1/Answers/' + id).then(function (res) {
        return res.data;
      });
    };

    this.create = function (answer) {
      return $http.post('/api/v1/Answers', answer).success(function (data) {
        _answers.push(data);
        answer.question.answers.push(data);
        questionService.update(answer.question);
      })
    };

    this.update = function (answer) {
      // return $http.get('/api/v1/Answers/' + answer._id).success(function(data) {
      //   var answerUpdate = data;
      //   answerUpdate.text = answer.text;
      //   answerUpdate.editedAt = new Date;
      //   answerUpdate.correct = answer.correct;
      //   return $http.put('/api/v1/Answers/' + answerUpdate._id, answerUpdate)
      //   .success(function(data) {
      //     // ToDo need to update _answers array
      //   });
      // });
      return $http.put('/api/v1/Answers/' + answer._id, answer)
    };

    this.remove = function (answer, question) {
      // if (question._id !== answer.question) {
      //   return false;
      // };
      return $http.delete('/api/v1/Answers/' + answer._id, answer).success(function (data) {
        _answers.splice(_answers.indexOf(answer), 1);
        var answerPos = question.answers.indexOf(data);
        question.answers.splice(answerPos, 1);
        questionService.update(question);
      });
    };
  };

})();

