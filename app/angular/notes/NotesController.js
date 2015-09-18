(function() {
  'use strict';

  angular
      .module('everquizApp')
      .controller('NotesController', NotesController);

  NotesController.$inject = ['notes', 'notesService'];

  function NotesController(notes, noteService) {

      var vm = this;
      vm.notes = notes;
      vm.newNote = {};
      vm.addNote = noteService.addNote;
  }
  
})();
