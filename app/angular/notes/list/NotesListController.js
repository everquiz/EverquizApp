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
        vm.page = 0;
        vm.maxPages = 0;
        vm.pageList = [vm.maxPages];
        vm.paginatorCheck = paginatorCheck;
        vm.nextPage = nextPage;
        vm.previousPage = previousPage;
        vm.goToPage = goToPage;
        vm.goToLastPage = goToLastPage;
        vm.goToFirstPage = goToFirstPage;
        vm.switchToMain = notesService.switchToMain;

        notesService.getNotes().then(function(res) {
            vm.notes = res;
            vm.notesNumber = vm.notes.length;
            getMaxPages()
            vm.pageList = [];
            for (var i = 0; i < vm.maxPages; ++i) vm.pageList.push(i);
            //console.log(vm.notes);
        });

        //Drag-and-drop
        vm.deletedList = [];
        vm.onMove = onMove;
        vm.onDeletedMove = onDeletedMove;
        vm.RecycleCleanUp = RecycleCleanUp;

        function onMove(index) {
            vm.notes.splice(index, 1)
            console.log(vm.notes);
        }

        function onDeletedMove(index) {
            vm.deletedList.splice(index, 1)
            console.log(vm.deletedList);
        }

        function RecycleCleanUp() {
            vm.deletedList.forEach(function(item, i, arr) {
                console.log(item);
                deleteNote(item);
            });
            vm.deletedList = [];
        }



        function paginatorCheck(index) {
            return ( (vm.page * vm.limit <= index) && (index < vm.page * vm.limit + vm.limit));
        }

        function nextPage() {
            if (vm.page + 1 <= vm.maxPages - 1) vm.page++;
        }

        function previousPage() {
            if (vm.page - 1 >= 0) vm.page--;
        }

        function goToPage(index) {
            if ( (index >= 0) && (index < vm.maxPages)) vm.page = index;
        }

        function goToLastPage() {
            goToPage(vm.maxPages - 1);
        }

        function goToFirstPage() {
            goToPage(0);
        }

        function addNote(note) {
            notesService.addNote(note);
            vm.notesNumber++;
            var oldMaxPages = vm.maxPages;
            getMaxPages();
            if (oldMaxPages != vm.maxPages) vm.pageList.push(vm.maxPages - 1);
            vm.newNote = {};
        }

        function deleteNote(note) {
            notesService.deleteNote(note);
            vm.notesNumber--;
            if (vm.page + 1 >  getMaxPages()) {
                vm.previousPage();
                vm.pageList.length--;
            }
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

        function getMaxPages() {
            vm.maxPages = (vm.notesNumber / vm.limit) >> 0;
            if (vm.notesNumber % vm.limit !== 0) vm.maxPages++;
            return vm.maxPages;
        }


    }

})();
