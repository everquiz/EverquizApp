(function() {
    'use strict';

    angular
        .module('everquizApp')
        .controller('NotesListController', NotesListController);

    NotesListController.$inject = ['notesService'];

    function NotesListController(notesService) {

        var vm = this;
        vm.notesNumber = 0;
        vm.editMenuActive = false;
        vm.createMenuActive = false;
        vm.hideCreate = hideCreate;
        vm.showCreate = showCreate;
        vm.toggleCreate = toggleCreate;
        vm.hideEdit = hideEdit;
        vm.showEdit = showEdit;
        vm.toggleEdit = toggleEdit;
        vm.editInit = editInit;
        vm.newNote = {};
        vm.editNote = {};
        vm.addNote = addNote;
        vm.onNoteClick = deleteNote;
        vm.updateNote = notesService.updateNote;
        vm.setLimit = notesService.setLimit;
        vm.limit = 15;
        vm.notes = [];
        vm.switchToMain = notesService.switchToMain;
        vm.toggleFavourite = toggleFavourite;

        function toggleFavourite(note) {
            note.favourite = !note.favourite;
            vm.updateNote(note);
        }

        notesService.getNotesByRating().then(function(res) {
            vm.notes = res;
            vm.notesNumber = vm.notes.length;
        });

        //Drag-and-drop
        vm.deletedList = [];
        vm.onMove = onMove;
        vm.onDragStyle = false;
        vm.onDeletedMove = onDeletedMove;
        vm.RecycleCleanUp = RecycleCleanUp;
        vm.toggleDragStyle = toggleDragStyle;

        function toggleDragStyle() {
            vm.onDragStyle = !vm.onDragStyle;
            return vm.onDragStyle;
        }

        function onMove(index) {
            vm.notes.splice(index, 1);
        }

        function onDeletedMove(index) {
            vm.deletedList.splice(index, 1);
        }

        function RecycleCleanUp() {
            vm.deletedList.forEach(function(item, i, arr) {
                deleteNote(item);
            });
            vm.deletedList = [];
        }

        function addNote(note) {
            note.rating = vm.notesNumber;
            notesService.addNote(note);
            vm.notesNumber++;
            vm.newNote = {};
        }

        function deleteNote(note) {
            notesService.deleteNote(note);
            vm.notesNumber--;
        }

        function editInit(note) {
            vm.editNote.title = note.title;
            vm.editNote.text = note.text;
            vm.editNote._id = note._id;
            vm.showEdit();
        }

        function toggleCreate() {
            vm.createMenuActive = !vm.createMenuActive;
        }

        function hideCreate() {
            vm.createMenuActive = false;
        }

        function showCreate() {
            vm.createMenuActive = true;
            vm.hideEdit();
        }

        function toggleEdit() {
            vm.editMenuActive = !vm.editMenuActive;
        }

        function hideEdit() {
            vm.editMenuActive = false;
        }

        function showEdit() {
            vm.editMenuActive = true;
            vm.hideCreate();
        }

    }
})();