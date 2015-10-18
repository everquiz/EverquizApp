(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('RunQuizzesController', RunQuizzesController);

    RunQuizzesController.$inject = ['quizFactory', 'categoryService', '$scope', 'historyService', 'authFactory'];

    function RunQuizzesController(quizFactory, categoryService, $scope, historyService, authFactory) {
        var vm = this;
        vm.statusShow = quizFactory.statusShow;
        vm.selectedCategory = -1;
        vm.selectedComplexity = -1;
        vm.selectedStatus = -1;
        vm.updateQuizzes = updateQuizzes;
        vm.historyService = historyService;
        vm.history = historyService.getHistory();
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
                    vm.filteredQuizzes = data.slice(0, vm.numPerPage);
                    vm.dataLoaded = true;
                    return vm.quizzes;
                });

            categoryService.getCategories()
                .then(function (data) {
                    vm.categories = data;
                    vm.categories.unshift({_id: -1, title: 'All categories'})
                });

            historyService.updateHistory();
        }

        function updateQuizzes() {
            var category, complexity, status, query;
            if (vm.selectedCategory === -1) {
                category = '!=-11111111111111111111111';
            } else {
                category = vm.selectedCategory;
            }
            if (vm.selectedComplexity === -1) {
                complexity = '!=-1'
            } else {
                complexity = vm.selectedComplexity;
            }
            query = '&category=' + category + '&complexity=' + complexity;
            vm.dataLoaded = false;
            quizFactory.getQuizzesByQuery(query)
                .then(function (data) {
                    vm.quizzes = data;
                    var quizzesByStatus = [];

                    if (vm.selectedStatus != -1) {
                        for (var i = vm.quizzes.length - 1; i >= 0; i--) {
                            if (historyService.getBestResult(vm.quizzes[i]) >= 0.7) {
                                quizzesByStatus.push(vm.quizzes[i]);
                            }
                        }
                        if (!vm.selectedStatus) {
                            vm.quizzes = vm.quizzes.diffInvers(quizzesByStatus);

                        } else {
                            vm.quizzes = vm.quizzes.diff(quizzesByStatus);
                        }
                    }
                    vm.dataLoaded = true;
                });
        }
    }
})();
