(function() {
  'use strict';

  angular
      .module('everquizApp')
      .controller('RunQuizzesController', RunQuizzesController);

    RunQuizzesController.$inject = ['quizService', 'categoryService'];

  function RunQuizzesController(quizService, categoryService) {
    var vm = this;
    vm.selectedCategory = -1;
    vm.selectedComplexity = -1;
    vm.quizzes = quizService.getQuizzes();
    vm.updateQuizzes = updateQuizzes;
    vm.difficulties = [
        {_id: -1, title: 'All difficulties'},
        {_id: 0, title: 'Novice'},
        {_id: 1, title: 'Advanced'},
        {_id: 2, title: 'Expert'}
      ];

    categoryService.getCategories().then(function(data) {
      vm.categories = data;
      vm.categories.unshift({_id: -1, title: 'All categories'})
      console.log(vm.categories);
    });



    function updateQuizzes() {
      var category, complexity, status, query;
      // if (vm.selectedCategory === -1) {
      //   vm.quizzes = quizService.getQuizzes();
      //   return;
      // };
      if (vm.selectedCategory === -1) {
        category = '!=-11111111111111111111111';
      } else {
        category = vm.selectedCategory;
      };
      if (vm.selectedComplexity === -1) {
        complexity = '!=1'
      } else {
        complexity = vm.selectedComplexity;
      };
      console.log(category);

      query = 'category=' + category + '&complexity=' + complexity;
      console.log(query);
      vm.quizzes = quizService.getQuizzesByQuery(query);
    }
  }

})();
