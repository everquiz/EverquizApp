(function() {
  'use strict'

  angular
      .module('everquizApp')
      .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['categories', 'categoryService', 'ngDialog', '$window'];

  function CategoriesController(categories, categoryService, ngDialog, $window) {
    var vm = this;
    vm.categories = categories;
    vm.addCategory = addCategory;
    vm.editCategory = editCategory;
    vm.removeCategory = removeCategory;
    vm.formTitle = 'Add new category';
    vm.resetTitle = resetTitle;

    function addCategory() {
      if (!vm.category.title || vm.category.title === '') {
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
      if ($window.confirm('Do you want to delete this category?')) {
        categoryService.remove(category);
        vm.category = {};
        vm.formTitle = 'Add new category';
      };
    };

    function resetTitle () {
      vm.category = {};
      vm.formTitle = 'Add new category';
    }
  }
})();
