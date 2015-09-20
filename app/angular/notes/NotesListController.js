(function() {
    'use strict';

    angular
        .module('everquizApp')
        .controller('NotesListController', NotesListController);

    NotesListController.$inject = ['notes', 'notesService'];

    function NotesListController(notes, notesService) {

        var vm = this;
        vm.notes = notes;
        vm.newNote = {};
        vm.addNote = notesService.addNote;
        vm.onNoteClick = notesService.deleteNote;
        vm.setLimit = notesService.setLimit;
        vm.limit = 8;
        vm.switchToMain = notesService.switchToMain;

        function onNoteClick() {
            console.log("Ok OK");
        }
    }

})();
