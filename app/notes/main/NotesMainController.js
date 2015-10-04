(function() {
  'use strict';

  angular
      .module('everquizApp')
      .controller('NotesMainController', NotesMainController);

    NotesMainController.$inject = ['notesService'];

  function NotesMainController(notesService) {

      //Model properties
      var vm = this;
      vm.notesSrv = notesService;

      //Model functions
      //***View managing
      vm.switchToList = notesService.switchToList;
      //***Notes managing
      vm.deleteNote = notesService.deleteNote;
      vm.updateNote = notesService.updateNote;
      vm.toggleFavourite = toggleFavourite;
      //*Applied functions
      vm.getRange = getRange;

      //Implementation
      function toggleFavourite(note) {
          note.favourite = !note.favourite;
          vm.updateNote(note);
      }

      function getRange(num) {
          return new Array(num);
      }
  }
})();
