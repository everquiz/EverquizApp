(function() {
  'use strict';

  angular
      .module('everquizApp')
      .controller('RunQuizzesController', RunQuizzesController);

    RunQuizzesController.$inject = ['quizService', 'categoryService'];

  function RunQuizzesController(quizService, categoryService) {
    var vm = this;
    vm.selected = -1;
    vm.quizzes = quizService.getQuizzes();
    vm.getQuizzesByCategory = getQuizzesByCategory;

    categoryService.getCategories().then(function(data) {
      vm.categories = data;
      vm.categories.unshift({_id: -1, title: 'All Categories'})
      console.log(vm.categories);
    });

    function getQuizzesByCategory () {
      if (vm.selected === -1) {
        vm.quizzes = quizService.getQuizzes();
        return;
      };
      vm.quizzes = quizService.getQuizzesByCategory(vm.selected);
    }
  }

})();
