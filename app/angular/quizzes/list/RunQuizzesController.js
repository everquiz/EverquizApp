(function() {
  'use strict';

  angular
      .module('everquizApp')
      .controller('RunQuizzesController', RunQuizzesController);

    RunQuizzesController.$inject = ['quizzes', 'quizService', 'categoryService'];

  function RunQuizzesController(quizzes, quizService, categoryService) {
    var vm = this;
    vm.selectedCategory = -1;
    vm.selectedComplexity = -1;
    vm.quizzes = quizzes;
    vm.updateQuizzes = updateQuizzes;
    vm.difficulties = [
        {_id: -1, title: 'All difficulties'},
        {_id: 0, title: 'Novice'},
        {_id: 1, title: 'Advanced'},
        {_id: 2, title: 'Expert'}
      ];
    vm.getComplexity = getComplexity;

    categoryService.getCategories().then(function(data) {
      vm.categories = data;
      vm.categories.unshift({_id: -1, title: 'All categories'})
      console.log(vm.categories);
    });



    function updateQuizzes() {
      var category, complexity, status, query;

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

      query = 'category=' + category + '&complexity=' + complexity;
      vm.quizzes = quizService.getQuizzesByQuery(query);
    }

    function getComplexity(complexity) {
      for (var i = vm.difficulties.length - 1; i >= 0; i--) {
        if (vm.difficulties[i]._id === complexity) {
          return vm.difficulties[i].title;
        };
      };
    };
  }

})();
