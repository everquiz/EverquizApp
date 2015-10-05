(function() {
  'use strict'

  angular
      .module('everquizApp')
      .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['categories', 'categoryService', 'ngDialog'];

  function CategoriesController(categories, categoryService, ngDialog) {
    var vm = this;
    vm.categories = categories;
    vm.addCategory = addCategory;
    vm.editCategory = editCategory;
    vm.removeCategory = removeCategory;
    vm.formTitle = 'Add new category';
    vm.resetTitle = resetTitle;
    vm.clickToOpen = clickToOpen;

    function clickToOpen() {
      var modal = document.getElementById('modal');
      console.log('modal', modal);
      if (modal.style.opacity == 0) {
        console.log('opacity 0')
        modal.style.display = 'block';
        modal.style.opacity = 1;
      } else {
        console.log('opacity 1')
        modal.style.opacity = 0;
        modal.style.display = 'none';
      }
    };

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
      vm.clickToOpen();
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

    function resetTitle () {
      vm.category = {};
      vm.formTitle = 'Add new category';
    }
  }
})();
