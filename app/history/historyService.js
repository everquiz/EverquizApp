(function () {
    'use strict';

    angular
        .module('everquizApp')
        .service('historyService', historyService);

    historyService.$inject = ['$http', 'authFactory'];

    function historyService($http, authFactory) {
        var self = this;
        self.getHistory = getHistory;
        self.getAverageResult = getAverageResult;
        self.getBestResult = getBestResult;
        self.getTotalPassing = getTotalPassing;
        self.getAverageResultProgression = getAverageResultProgression;

        function getHistory() {
            var id = authFactory.currentUserId();
            return $http.get('/api/v1/Histories?user=' + id)
                .then(function (res) {
                    self.history = res.data;
                    return self.history;
                }, function (err) {
                    return self.history;
                });
        }

        function getAverageResult(quiz) {
            var sum = 0;
            var count = 0;
            for (var i = 0; i < self.history.length; i++) {
                if (self.history[i].quiz === quiz._id) {
                    sum += self.history[i].result;
                    count++;
                }
            }

            return sum / count ? Math.round((sum / count) * 100) : 0;
        }

        function getAverageResultProgression() {
            var sum = 0;
            var count = 0;
            var progressionList = [];
            for (var i = 0; i < self.history.length; i++) {
                sum += self.history[i].result;
                count++;
                progressionList[i] = sum / count ? Math.round((sum / count) * 100) : 0;
            }

            return progressionList;
        }

        function getBestResult(quiz) {
            var max = 0;
            for (var i = 0; i < self.history.length; i++) {
                if (self.history[i].quiz === quiz._id) {
                    if (max < self.history[i].result) {
                        max = self.history[i].result;
                    }
                }
            }

            return Math.round(max * 100);
        }

        function getTotalPassing(quiz) {
            var count = 0;
            for (var i = 0; i < self.history.length; i++) {
                if (self.history[i].quiz === quiz._id) {
                    count++;
                }
            }

            return count;
        }
    }
})();