(function () {
    'use strict'

    angular
        .module('everquizApp')
        .service('historyService', historyService);

    historyService.$inject = ['$http', 'authFactory'];

    function historyService($http, authFactory) {
        var vm = this;
        vm.getHistory = getHistory;
        vm.getAverageResult = getAverageResult;
        vm.getBestResult = getBestResult;
        vm.getTotalPassing = getTotalPassing;
        vm.getAverageResultProgression = getAverageResultProgression;

        function getHistory() {
            var id = authFactory.currentUserId();
            if (id) {
                return $http.get('/api/v1/Histories?user=' + id).then(function (res) {
                    vm.history = res.data;
                    return vm.history;
                });
            }
        }

        function getAverageResult(quiz) {
            var sum = 0;
            var count = 0;
            for (var i = 0; i < vm.history.length; i++) {
                if (vm.history[i].quiz === quiz._id) {
                    sum += vm.history[i].result;
                    count++;
                }
            }

            return sum / count ? Math.round((sum / count) * 100) : 0;
        }

        function getAverageResultProgression() {
            var sum = 0;
            var count = 0;
            var progressionList = [];
            for (var i = 0; i < vm.history.length; i++) {
                    sum += vm.history[i].result;
                    count++;
                progressionList[i] = sum / count ? Math.round((sum / count) * 100) : 0;
            }

            return progressionList;
        }

        function getBestResult(quiz) {
            var max = 0;
            for (var i = 0; i < vm.history.length; i++) {
                if (vm.history[i].quiz === quiz._id) {
                    if (max < vm.history[i].result) {
                        max = vm.history[i].result;
                    }
                }
            }

            return Math.round(max * 100);
        }

        function getTotalPassing(quiz) {
            var count = 0;
            for (var i = 0; i < vm.history.length; i++) {
                if (vm.history[i].quiz === quiz._id) {
                    count++;
                }
            }

            return count;
        }
    }
})();