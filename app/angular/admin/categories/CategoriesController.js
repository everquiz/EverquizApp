(function() {
  'use strict'

  angular
      .module('everquizApp')
      .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['$scope', 'categories', 'categoryService'];

  function CategoriesController($scope, categories, categoryService) {
    var vm = this;
    vm.categories = categories;
    vm.addCategory = addCategory;
    vm.editCategory = editCategory;
    vm.removeCategory = removeCategory;
    vm.formTitle = 'Add new category';

    function addCategory() {
      if ((!vm.category.title || vm.category.title === '')
          || (!vm.category.description || vm.category.description === '')) {
        return;
      }
      if (!vm.category._id || vm.category._id === '') {
        categoryService.create(vm.category);
      }
      else {
        categoryService.update(vm.category);
      }
      vm.category = {};
      vm.formTitle = 'Add new category';
    };

    function editCategory(category) {
      vm.category = category;
      vm.formTitle = 'Edit category';
    };

    function removeCategory(category) {
      if (confirm('Do you want to delete this category?')) {
        categoryService.remove(category);
        vm.category = {};
        vm.formTitle = 'Add new category';
      };
    };
  }
})();
