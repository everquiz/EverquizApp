(function() {
  'use strict';

  angular
      .module('everquizApp')
      .controller('NotesMainController', NotesMainController);

    NotesMainController.$inject = ['notesService'];

  function NotesMainController(notesService) {

      var vm = this;
      vm.switchToList = notesService.switchToList;

      notesService.getNotes().then(function(res) {
          vm.notes = res;
          //console.log(vm.notes);
      });

      vm.limit = 8;
  }
  
})();
