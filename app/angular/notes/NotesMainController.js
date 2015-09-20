(function() {
  'use strict';

  angular
      .module('everquizApp')
      .controller('NotesMainController', NotesMainController);

    NotesMainController.$inject = ['notes', 'notesService'];

  function NotesMainController(notes, notesService) {

      var vm = this;
      vm.switchToList = notesService.switchToList;
      vm.onNoteClick = notesService.deleteNote;
      vm.notes = notes;
      vm.limit = 8;
  }
  
})();
