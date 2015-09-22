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
        vm.editInit = editInit;
        vm.newNote = {};
        vm.editNote = {};
        vm.addNote = addNote;
        vm.onNoteClick = deleteNote;
        vm.updateNote = notesService.updateNote;
        vm.setLimit = notesService.setLimit;
        vm.limit = 6
        vm.page = 0;
        vm.maxPages = 0;
        vm.paginatorCheck = paginatorCheck;
        vm.nextPage = nextPage;
        vm.previousPage = previousPage;
        vm.switchToMain = notesService.switchToMain;


        function paginatorCheck(index) {
            return ( (vm.page * vm.limit <= index) && (index < vm.page * vm.limit + vm.limit));
        }

        function nextPage() {
            if (vm.page + 1 <= vm.maxPages - 1) vm.page++;
        }

        function previousPage() {
            if (vm.page - 1 >= 0) vm.page--;
        }

        function addNote(note) {
            notesService.addNote(note);
            vm.notesNumber++;
            getMaxPages()
            vm.newNote = {};
        }

        function deleteNote(note) {
            notesService.deleteNote(note);
            vm.notesNumber--;
            if (vm.page + 1 >  getMaxPages()) vm.previousPage();
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

        function hideEdit() {
            vm.editMenuActive = false;
        }

        function showEdit() {
            vm.editMenuActive = true;
            vm.hideCreate();
        }

        notesService.getNotes().then(function(res) {
            vm.notes = res;
            vm.notesNumber = vm.notes.length;
            getMaxPages()
            console.log(vm.notes);
        });

        function getMaxPages() {
            vm.maxPages = vm.notesNumber / vm.limit;
            if (vm.notesNumber % vm.limit !== 0) vm.maxPages++;
            return vm.maxPages;
        }


    }

})();
