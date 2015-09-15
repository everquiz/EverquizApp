(function() {
  'use strict';

  angular
      .module('everquizApp')
      .controller('NoteController', NoteController);

  NoteController.$inject = ['user', 'noteService'];

  function NoteController(user, noteService) {
    
    var vm = this;
    vm.notes = user.notes;
    vm.user = user;
    vm.editNote = editNote;
    vm.addNote = addNote;
    vm.removeNote = removeNote;

    function editNote(note) {
      vm.title = note.title;
      vm.text = note.text;
      vm.id = note._id;
    }

    function addNote() {
      if ((!vm.title || vm.title === '')
          || (!vm.text || vm.text === '')) {
        return;
      }
      var note = {};
      if (!vm.id || vm.id === '') {
        note.title = vm.title;
        note.text = vm.text;
        note.user = user;
        noteService.create(note, user);
      } else {
        note.id = vm.id;
        note.title = vm.title;
        note.text = vm.text;
        note.user = user;
        noteService.update(note, user);
        vm.id = '';

      }
      vm.title = '';
      vm.text = '';
    };

    function removeNote(note) {
      if (confirm('Do you want to delete ' + note.title + ' ?')) {
        noteService.remove(note, user);
      }
      ;
    };
  }
  
})();
