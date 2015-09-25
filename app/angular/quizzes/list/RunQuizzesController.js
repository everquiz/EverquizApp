(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('RunQuizzesController', RunQuizzesController);

    RunQuizzesController.$inject = ['quizzes', 'quizService', 'categoryService', '$scope', 'historyService'];

    function RunQuizzesController(quizzes, quizService, categoryService, $scope, historyService) {
        var vm = this;
        vm.selectedCategory = -1;
        vm.selectedComplexity = -1;
        vm.selectedStatus = -1;
        vm.quizzes = quizzes;
        vm.updateQuizzes = updateQuizzes;
        vm.historyService = historyService;
        vm.difficulties = quizService.getDifficulties();
        if (vm.difficulties[0]._id != -1) {
            vm.difficulties.unshift({_id: -1, title: 'All difficulties'});
        }
        vm.getComplexity = quizService.getComplexity;
        vm.statuses = [
            {_id: -1, title: 'All statuses'},
            {_id: 0, title: 'Passed'},
            {_id: 1, title: 'non-Passed'}
        ];
        vm.updateFilteredQuizzes = updateFilteredQuizzes;

        categoryService.getCategories().then(function (data) {
            vm.categories = data;
            vm.categories.unshift({_id: -1, title: 'All categories'})
        });

        historyService.getHistory()
            .then(function (history) {
                vm.statistics = {
                    getAverageResult : historyService.getAverageResult,
                    getBestResult : historyService.getBestResult,
                    getTotalPassing : historyService.getTotalPassing
                }
            });

        /**
         * Paginations variables
         */
        vm.maxSize = $scope.maxSize = 5;
        vm.numPerPage = $scope.numPerPage = 15;
        $scope.currentPage = $scope.currentPage = 1;
        vm.numPages = numPages;
        quizService.getQuizzes().then(function (res) {
            vm.filteredQuizzes = res.slice(0, vm.numPerPage);
        });

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
            query = 'category=' + category + '&complexity=' + complexity;
            quizService.getQuizzesByQuery(query).then(function (data) {
                vm.quizzes = data;
                var quizzesByStatus = [];
                
                if (vm.selectedStatus != -1) {
                    for (var i = vm.quizzes.length - 1; i >= 0; i--) {
                        if (historyService.getBestResult(vm.quizzes[i]) >= 0.7) {
                            quizzesByStatus.push(vm.quizzes[i]);
                        }
                    }
                    if (!vm.selectedStatus) {
                        vm.quizzes = vm.quizzes.diffInvers( quizzesByStatus ); 

                    } else {
                        vm.quizzes = vm.quizzes.diff( quizzesByStatus ); 
                    }
                }
                vm.updateFilteredQuizzes();

            });
        }


        function numPages() {
            return Math.ceil(vm.quizzes.length / vm.numPerPage);
        }

        /**
         * Watcher for paggination
         */
        $scope.$watch('currentPage + numPerPage', updateFilteredQuizzes);

        /**
         * Handler for pagination
         */
        function updateFilteredQuizzes() {
            var begin = (($scope.currentPage - 1) * vm.numPerPage)
                , end = begin + vm.numPerPage;
            vm.filteredQuizzes = vm.quizzes.slice(begin, end);
        }
    }
})();
