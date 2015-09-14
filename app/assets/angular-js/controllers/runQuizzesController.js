(function() {
  'use strict';

  angular
      .module('everquizApp')
      .controller('RunQuizzesController', RunQuizzesController);

    RunQuizzesController.$inject = ['quizService', 'categoryService'];

  function RunQuizzesController(quizService, categoryService) {
    var vm = this;
    vm.quizzes = quizService.getQuizzes();
  }

})();