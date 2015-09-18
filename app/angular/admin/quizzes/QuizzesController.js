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
    vm.categories = categoryService.getAll();
    vm.addQuiz = addQuiz;
    vm.editQuiz = editQuiz;
    vm.getStatus = getStatus;
    vm.deactivateQuiz = deactivateQuiz;
    vm.activateQuiz = activateQuiz;
    vm.statuses = [{
      id: 0,
      title: 'Unactive'
    }, {
      id: 1,
      title: 'Active'
    }]

    function activateQuiz(quiz) {
      quizService.active(quiz);
    };

    function deactivateQuiz(quiz) {
      if (confirm('Do you want to make unactive ' + quiz.title + ' ?')) {
        quizService.unactive(quiz);
      }
    };

    function getStatus(status) {
      var statusTypes = ['Unactive', 'Active'];
      return statusTypes[status];
    };

    function editQuiz(quiz) {
      vm.quiz = quiz;
      vm.categories.forEach(function(element, index){
        if (vm.quiz.category._id === element._id) {
          vm.quiz.category = element;
        };
      });
    };

    function addQuiz() {
      if ((!vm.quiz.title || vm.quiz.title === '')
          || (!vm.quiz.description || vm.quiz.description === '')) {
        return;
      }
      // if (!vm.quiz.category || vm.quiz.category === '') {
      //   vm.categories.forEach(function(element, index){
      //     if (vm.quiz.category._id === element._id) {
      //       vm.quiz.category = element;
      //     };
      //   });
      // }
      // 
      
      if (!vm.quiz._id || vm.quiz._id === '') {
        quizService.create(vm.quiz);
      }
      else {
        quizService.update(vm.quiz);
      }
      vm.quiz = {};
    };
  };


})();
