(function() {
  'use strict'

  angular
      .module('everquizApp')
      .service('questionService', questionService);

  questionService.$inject = ['$http', 'quizService'];

  function questionService($http, quizService) {
    var _questions = [];
    this.questions = _questions;

    this.get = function (id) {
      console.log('get question');
      return $http.get('/api/v1/Questions/' + id + '?populate=answers').then(function (res) {
        return res.data;
      });
    };

    this.create = function (question) {
      return $http.post('/api/v1/Questions', question).success(function (data) {
        _questions.push(data);
        question.quiz.questions.push(data);
        quizService.update(question.quiz);
      });
    };

    this.remove = function (question, quiz) {
      return $http.delete('/api/v1/Questions/' + question._id, question).success(function (data) {
        //   var questionPos = quiz.questions.indexOf(data);
        //   // quiz.questions.splice(questionPos, 1);
        //   // quizService.update(quiz);
        //   ToDo refresh question array
        //   _questions.splice(questionPos, 1);
        for (var i = question.answers.length - 1; i >= 0; i--) {
          var answer = question.answers[i];
          console.log(answer);
          $http.delete('/api/v1/Answers/' + answer);
        }
        ;
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
      return $http.put('/api/v1/Questions/' + question._id, question);
    };
  }

})();
