(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('RunQuizzesController', RunQuizzesController);

    RunQuizzesController.$inject = ['quizFactory', 'categoryService', 'historyService', 'authFactory'];

    function RunQuizzesController(quizFactory, categoryService, historyService, authFactory) {
        var vm = this;
        vm.statusShow = quizFactory.statusShow;
        vm.selectedCategory = -1;
        vm.selectedComplexity = -1;
        vm.selectedStatus = -1;
        vm.updateQuizzes = updateQuizzes;
        vm.difficulties = quizFactory.getDifficulties();
        if (vm.difficulties[0]._id != -1) {
            vm.difficulties.unshift({_id: -1, title: 'All difficulties'});
        }
        vm.getComplexity = quizFactory.getComplexity;
        vm.statuses = [
            {_id: -1, title: 'All statuses'},
            {_id: 0, title: 'Passed'},
            {_id: 1, title: 'non-Passed'}
        ];

        vm.dataLoaded = false;
        vm.categories = [{_id: -1, title: 'All categories'}];

        activate();

        function activate() {
            quizFactory.getQuizzes()
                .then(function (data) {
                    vm.quizzes = data;
                    vm.dataLoaded = true;
                });


            categoryService.getCategories()
                .then(function (data) {
                    vm.categories = vm.categories.concat(data);
                });

            if (authFactory.currentUserId()) {
                historyService.updateHistory()
                    .then(function (data) {
                        vm.history = data;
                    });
            }
        }

        function updateQuizzes() {
            var category = (vm.selectedCategory === -1) ? '' : '&category=' + vm.selectedCategory;
            var complexity = (vm.selectedComplexity === -1) ? '' : '&complexity=' + vm.selectedComplexity;
            vm.dataLoaded = false;
            quizFactory.getQuizzesByQuery(category + complexity)
                .then(function (data) {
                    vm.quizzes = vm.selectedStatus == -1 ? data : data.filter(function (item) {
                        return !vm.selectedStatus && vm.history.getBestResult(item) >= 70 ||
                            vm.selectedStatus && vm.history.getBestResult(item) < 70;
                    });
                    vm.dataLoaded = true;
                });
        }
    }
})();