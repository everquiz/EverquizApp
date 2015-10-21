(function () {
    'use strict';

    angular
        .module('everquizApp')
        .service('historyService', historyService);

    historyService.$inject = ['$http', 'authFactory'];

    function historyService($http, authFactory) {
        var self = this;
        var history = [];

        self.updateHistory = updateHistory;
        self.getHistory = getHistory;
        self.getAverageResultProgression = getAverageResultProgression;

        function updateHistory() {
            var id = authFactory.currentUserId();
            if (id) {
                return $http.get('/api/v1/Histories?user=' + id)
                    .then(function (res) {
                        history = res.data;
                        history.getAverageResult = getAverageResult;
                        history.getAverageResultProgression = getAverageResultProgression;
                        history.getBestResult = getBestResult;
                        history.getTotalPassing = getTotalPassing;
                        return history;
                    });
            }
        }

        function getHistory() {
            return history;
        }

        function getAverageResult(quiz) {
            var sum = 0;
            var count = 0;
            for (var i = 0; i < this.length; i++) {
                if (this[i].quiz === quiz._id) {
                    sum += this[i].result;
                    count++;
                }
            }
            return sum / count ? Math.round((sum / count) * 100) : 0;
        }

        function getAverageResultProgression() {
            var sum = 0;
            var count = 0;
            var progressionList = [];
            for (var i = 0; i < this.length; i++) {
                sum += this[i].result;
                count++;
                progressionList[i] = sum / count ? Math.round((sum / count) * 100) : 0;
            }
            return progressionList;
        }

        function getBestResult(quiz) {
            var max = 0;
            for (var i = 0; i < this.length; i++) {
                if (this[i].quiz === quiz._id) {
                    if (max < this[i].result) {
                        max = this[i].result;
                    }
                }
            }
            return Math.round(max * 100);
        }

        function getTotalPassing(quiz) {
            var count = 0;
            for (var i = 0; i < this.length; i++) {
                if (this[i].quiz === quiz._id) {
                    count++;
                }
            }
            return count;
        }
    }
})();