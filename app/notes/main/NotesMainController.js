(function() {
  'use strict';

  angular
      .module('everquizApp')
      .controller('NotesMainController', NotesMainController);

    NotesMainController.$inject = ['notesService'];

  function NotesMainController(notesService) {

      var vm = this;
      vm.limit = 8;
      vm.switchToList = notesService.switchToList;
      vm.deleteNote = deleteNote;
      vm.toggleFavourite = toggleFavourite;
      vm.updateNote = notesService.updateNote;

      notesService.getNotesByFavourite().then(function (res) {
          vm.notes = res;
          noteNormalize();
      });

      function toggleFavourite(note) {
          note.favourite = !note.favourite;
          vm.updateNote(note);
      }
      function deleteNote(note) {
          for (var i = 0; i < vm.notes.length - 1; ++i) {
              if (vm.notes[i]._id === note._id) break;
          }
          vm.notes.splice(i, 1);
          noteNormalize();
          notesService.deleteNote(note);
      }

      function noteNormalize() {
          for (var i = 0; i <= 7; ++i)
              if (vm.notes[i] === undefined) vm.notes[i] = {empty: true};
      }
  }
})();
