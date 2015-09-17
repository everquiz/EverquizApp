(function() {
  'use strict';

  angular
      .module('everquizApp')
      .controller('QuizzesController', QuizzesController);

  QuizzesController.$inject = ['$scope', 'quizzes', 'quizService', 'categoryService'];

  function QuizzesController($scope, quizzes, quizService, categoryService) {
    // $scope.quizzes = quizService.quizzes;

    var vm = this;
    vm.status = 0;
    vm.quizzes = quizzes;
    vm.categories = categoryService.getCategories();
    vm.addQuiz = addQuiz;
    vm.editQuiz = editQuiz;
    vm.getStatus = getStatus;
    vm.deactivateQuiz = deactivateQuiz;
    vm.activateQuiz = activateQuiz;

    function activateQuiz(quiz) {
      quizService.active(quiz);
    };

    function deactivateQuiz(quiz) {
      if (confirm('Do you want to make unactive ' + quiz.title + ' ?')) {
        quizService.unactive(quiz);
      }
      ;
    };

    function getStatus(status) {
      var statusTypes = ['Unactive', 'Active'];
      return statusTypes[status];
    };

    function editQuiz(quiz) {
      console.log($scope.quiz);
      $scope.quiz = quiz;
    };

    function addQuiz() {
      console.log($scope.quiz);
      if ((!$scope.quiz.title || $scope.quiz.title === '')
          || (!$scope.quiz.description || $scope.quiz.description === '')) {
        return;
      }
      if (!$scope.quiz._id || $scope.quiz._id === '') {
        quizService.create($scope.quiz);
      }
      else {
        quizService.update($scope.quiz);
      }
      $scope.quiz = {};
    };
  };

})();
