(function() {
  'use strict'

  angular
      .module('everquizApp')
      .service('answerService', answerService);

  answerService.$inject = ['$http', 'questionService', 'authFactory'];

  function answerService($http, questionService, authFactory) {
    var _answers = [];
    this.answers = _answers;
    this.get = function (id) {
      return $http.get('/api/v1/Answers/' + id, {
            headers: {Authorization: 'Bearer ' + authFactory.getToken()}
        }).then(function (res) {
        return res.data;
      });
    };

    this.create = function (answer) {
      return $http.post('/api/v1/Answers', answer, {
            headers: {Authorization: 'Bearer ' + authFactory.getToken()}
        }).success(function (data) {
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
      return $http.delete('/api/v1/Answers/' + answer._id, answer , {
            headers: {Authorization: 'Bearer ' + authFactory.getToken()}
          }).then(function (res) {
          question.answers.forEach(function(element, index){
            if (res.config._id === element._id) {
              question.answers.splice(index, 1);
            };
          });
        questionService.update(question);
      });
    };
  };

})();

