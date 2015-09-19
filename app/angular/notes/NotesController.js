(function() {
  'use strict';

  angular
      .module('everquizApp')
      .controller('NotesController', NotesController);

  NotesController.$inject = ['notes', 'notesService'];

  function NotesController(notes, noteService) {

      var vm = this;
      vm.isVisible = noteService.isVisible;
      vm.notes = notes;
      vm.newNote = {};
      vm.addNote = noteService.addNote;
      vm.onNoteClick = onNoteClick;
      vm.setLimit = setLimit;
      vm.limit = 8;


      function setLimit(limit) {
          vm.limit = limit;
      }

      function onNoteClick() {
          console.log("Ok OK");
      }
  }
  
})();
