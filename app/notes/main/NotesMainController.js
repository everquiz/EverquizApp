(function() {
  'use strict';

  angular
      .module('everquizApp')
      .controller('NotesMainController', NotesMainController);

    NotesMainController.$inject = ['notesService'];

  function NotesMainController(notesService) {

      var vm = this;
      vm.notesSrv = notesService;
      vm.switchToList = notesService.switchToList;
      vm.deleteNote = notesService.deleteNote;
      vm.updateNote = notesService.updateNote;

      vm.toggleFavourite = toggleFavourite;
      vm.getRange = getRange;

      //View - Model functions
      function toggleFavourite(note) {
          note.favourite = !note.favourite;
          vm.updateNote(note);
      }

      function getRange(num) {
          return new Array(num);
      }
  }
})();
