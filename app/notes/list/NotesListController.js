(function() {
    'use strict';

    angular
        .module('everquizApp')
        .controller('NotesListController', NotesListController);

    NotesListController.$inject = ['notesService'];

    function NotesListController(notesService) {

        //Model properties
        var vm = this;
        vm.notes = notesService.notes;
        vm.editMenuActive = false;
        vm.createMenuActive = false;
        vm.newNote = {};
        vm.editNote = {};
        vm.limit = 15;

        vm.deletedList = [];
        vm.onDragStyle = false;

        //Model functions
        //***View managing
        vm.hideCreate = hideCreate;
        vm.showCreate = showCreate;
        vm.toggleCreate = toggleCreate;
        vm.hideEdit = hideEdit;
        vm.showEdit = showEdit;
        vm.toggleEdit = toggleEdit;
        vm.editInit = editInit;
        //***Notes managing
        vm.addNote = addNote;
        vm.onNoteClick = deleteNote;
        vm.updateNote = updateNote;
        vm.switchToMain = notesService.switchToMain;
        vm.toggleFavourite = toggleFavourite;
        //***Drag-and-drop
        vm.onMove = onMove;
        vm.onDeletedMove = onDeletedMove;
        vm.RecycleCleanUp = RecycleCleanUp;
        vm.toggleDragStyle = toggleDragStyle;


        //Implementation
        //***Drag-and-drop
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

        //***Notes managing
        function addNote(note) {
            note.rating = vm.notesNumber;
            notesService.addNote(note);
            vm.newNote = {};
        }

        function updateNote(note) {
            notesService.updateNote(note);
            vm.editNote = {};
        }

        function deleteNote(note) {
            notesService.deleteNote(note);
        }

        function toggleFavourite(note) {
            note.favourite = !note.favourite;
            vm.updateNote(note);
        }

        //***View managing
        //******Create form view
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

        //******Edit form view
        function editInit(note) {
            vm.editNote = note;
            vm.hideCreate();
            vm.showEdit();
        }

        function toggleEdit() {
            vm.editMenuActive = !vm.editMenuActive;
        }

        function hideEdit() {
            vm.editMenuActive = false;
        }

        function showEdit() {
            vm.editMenuActive = true;
        }

    }
})();