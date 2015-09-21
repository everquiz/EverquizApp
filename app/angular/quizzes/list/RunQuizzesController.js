(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('RunQuizzesController', RunQuizzesController);

    RunQuizzesController.$inject = ['quizzes', 'quizService', 'categoryService', '$scope', 'history'];

    function RunQuizzesController(quizzes, quizService, categoryService, $scope, history) {
        var vm = this;
        vm.selectedCategory = -1;
        vm.selectedComplexity = -1;
        vm.quizzes = quizzes;
        vm.updateQuizzes = updateQuizzes;
        vm.history = history;
        vm.getAverageResult = getAverageResult;
        vm.difficulties = [
            {_id: -1, title: 'All difficulties'},
            {_id: 0, title: 'Novice'},
            {_id: 1, title: 'Advanced'},
            {_id: 2, title: 'Expert'}
        ];
        vm.getComplexity = getComplexity;
        vm.updateFilteredQuizzes = updateFilteredQuizzes;
        categoryService.getCategories().then(function (data) {
            vm.categories = data;
            vm.categories.unshift({_id: -1, title: 'All categories'})
        });

        /**
         * Paginations variables
         */
        vm.maxSize = $scope.maxSize = 5;
        vm.numPerPage = $scope.numPerPage = 5;
        $scope.currentPage = $scope.currentPage = 1;
        vm.numPages = numPages;
        quizService.getAllTest().then(function (res) {
            vm.filteredQuizzes = res.slice(0, vm.numPerPage);
        });

        function updateQuizzes() {
            var category, complexity, status, query;
            console.log(vm.selectedCategory);
            if (vm.selectedCategory === -1) {
                category = '!=-11111111111111111111111';
            } else {
                category = vm.selectedCategory;
            }
            if (vm.selectedComplexity === -1) {
                complexity = '!=1'
            } else {
                complexity = vm.selectedComplexity;
            }

            query = 'category=' + category + '&complexity=' + complexity;
            quizService.getQuizzesByQuery(query).then(function (data) {
                vm.quizzes = data;
                vm.updateFilteredQuizzes();
            });
        }

        function getAverageResult(quiz) {
            var sum = 0;
            var count = 0;
            for (var i = 0; i< vm.history.length; i++) {
                if (vm.history[i].quiz === quiz._id) {
                    sum += vm.history[i].result;
                    count += 1;
                }
            }

            return sum /count ? sum/count : 0;
        }

        function getComplexity(complexity) {
            for (var i = vm.difficulties.length - 1; i >= 0; i--) {
                if (vm.difficulties[i]._id === complexity) {
                    return vm.difficulties[i].title;
                }
            }
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
            console.log(vm.filteredQuizzes);
        }
    }
})();
