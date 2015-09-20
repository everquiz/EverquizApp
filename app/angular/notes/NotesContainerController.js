(function() {
    'use strict';

    angular
        .module('everquizApp')
        .controller('NotesContainerController', NotesContainerController);

    NotesContainerController.$inject = ['notesService'];

    function NotesContainerController(notesService) {

        var vm = this;
        vm.isVisible = notesService.isVisible;
        vm.isMain = notesService.isMain;
        vm.isList = notesService.isList;
    }

})();
