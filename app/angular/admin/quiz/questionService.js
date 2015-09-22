(function() {
  'use strict'

  angular
      .module('everquizApp')
      .service('questionService', questionService);

  questionService.$inject = ['$http', 'quizService', 'authFactory'];

  function questionService($http, quizService, authFactory) {
    var _questions = [];
    this.questions = _questions;

    this.get = function (id) {
      console.log('get question');
      return $http.get('/api/v1/Questions/' + id + '?populate=answers', {
            headers: {Authorization: 'Bearer ' + authFactory.getToken()}
        }).then(function (res) {
        return res.data;
      });
    };

    this.create = function (question) {
      return $http.post('/api/v1/Questions', question, {
            headers: {Authorization: 'Bearer ' + authFactory.getToken()}
        }).success(function (data) {
        _questions.push(data);
        question.quiz.questions.push(data);
        quizService.update(question.quiz);
      });
    };

    this.remove = function (question, quiz) {
      console.log(question);
      return $http.delete('/api/v1/Questions/' + question._id, question, {
            headers: {Authorization: 'Bearer ' + authFactory.getToken()}
        }).then(function (res) {
          quiz.questions.forEach(function(element, index){
            if (res.config._id === element._id) {
              quiz.questions.splice(index, 1);
            };
          });
          quizService.update(quiz);
          for (var i = question.answers.length - 1; i >= 0; i--) {
            var answer = question.answers[i];
            $http.delete('/api/v1/Answers/' + answer, {
              headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            });
          };
        });
    };

    this.update = function (question) {
      // return $http.get('/api/v1/Questions/' + question._id).success(function(data) {
      //   var questionUpdate = data;
      //   questionUpdate.text = question.text;
      //   questionUpdate.editedAt = new Date;
      //   questionUpdate.answers = question.answers;
      //   console.log('question');
      //   console.log(question);
      //   console.log('questionUpdate');
      //   console.log(questionUpdate);

      //   // return $http.put('/api/v1/Questions/' + questionUpdate._id, questionUpdate).success(function(data) {
      //   //   // ToDo need to update _questions array
      //   // });
      // });
      return $http.put('/api/v1/Questions/' + question._id, question, {
            headers: {Authorization: 'Bearer ' + authFactory.getToken()}
          });
    };
  }

})();
