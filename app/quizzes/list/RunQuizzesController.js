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

        activate();

        function activate() {
            quizFactory.getQuizzes()
                .then(function (data) {
                    vm.quizzes = data;
                    vm.dataLoaded = true;
                });

            categoryService.getCategories()
                .then(function (data) {
                    vm.categories = data;
                    vm.categories.unshift({_id: -1, title: 'All categories'})
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
                    vm.quizzes = data;
                    if (vm.selectedStatus != -1) {
                        vm.quizzes = [];
                        for (var i = 0; i < data.length; i++) {
                            if (!vm.selectedStatus && vm.history.getBestResult(data[i]) >= 70 ||
                                vm.selectedStatus && vm.history.getBestResult(data[i]) < 70) {
                                vm.quizzes.push(data[i]);
                            }
                        }
                    }
                    vm.dataLoaded = true;
                });
        }
    }
})();