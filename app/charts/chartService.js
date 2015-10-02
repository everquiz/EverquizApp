(function() {
    'use strict'

    angular
        .module('everquizApp')
        .service('chartService', chartService);

    chartService.$inject = ['historyService'];

    function chartService(historyService) {
        this.quiz_day = quiz_day;
        this.quiz_succesful_day = quiz_succesful_day;
        this.average_day = average_day;
        this.cases = [
            {
                name: "Average result progression",
                event: average_day
            },
            {
                name: "Number of quizzes per date",
                event: quiz_day
            },
            {
                name: "Number of succesful quizzes per date",
                event: quiz_succesful_day
            }
        ]

        function average_day(date_start, date_end) {
            var labels = [];
            var data = [[]];
            data[0] = historyService.getAverageResultProgression();
            for (var i = 0; i < historyService.history.length; ++i) {
                var date = new Date(historyService.history[i].createdAt);
                //if (date >= date_start && date <= date_end) {
                    var dateStr = date.getFullYear().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getDay().toString();
                    labels[i] = dateStr;
                //}
            }

            return {
                labels: labels,
                series: ["Average result progression"],
                data : data,
                colours : ['#FD2828']
            }
        }

        function quiz_day(date_start, date_end) {
            var initDate = new Date(historyService.history[0].createdAt);
            var initDateStr = initDate.getFullYear().toString() + '/' + (initDate.getMonth() + 1).toString() + '/' + initDate.getDay().toString();
            var labels = [initDateStr];
            var data = [[1]];
            var dataCounter = 0;
            for (var i = 1; i < historyService.history.length; ++i) {
                var date = new Date(historyService.history[i].createdAt);
                //if (date >= date_start && date <= date_end) {
                var dateStr = date.getFullYear().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getDay().toString();
                if (dateStr === labels[dataCounter]) data[0][dataCounter]++;
                else {
                    dataCounter++;
                    data[0].push(1);
                    labels[dataCounter] = dateStr;
                }
                //}
            }

            return {
                labels: labels,
                series: ["Number of quizzes per date"],
                data : data,
                colours : ['#FD2828']
            }
        }

        function quiz_succesful_day(date_start, date_end) {
            var initDate = new Date(historyService.history[0].createdAt);
            var initDateStr = initDate.getFullYear().toString() + '/' + (initDate.getMonth() + 1).toString() + '/' + initDate.getDay().toString();
            var labels = [initDateStr];
            var data = [[1]];
            var dataCounter = 0;
            for (var i = 1; i < historyService.history.length; ++i) {
                if (historyService.history.result > 0.75) {
                    var date = new Date(historyService.history[i].createdAt);
                    //if (date >= date_start && date <= date_end) {
                    var dateStr = date.getFullYear().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getDay().toString();
                    if (dateStr === labels[dataCounter]) {
                        data[0][dataCounter]++;
                    }
                    else {
                        dataCounter++;
                        data[0].push(1);
                        labels[dataCounter] = dateStr;
                    }
                    //}
                }
            }

            var series = ["Number of succesful quizzes per date"];
            if (data[0].length === 1 && data[0][0] === 1) {
                data = [[]];
                labels = [];
                series = ["No succesful quizzes"];
            }
            return {
                labels: labels,
                series: series,
                data : data,
                colours : ['#FD2828']
            }
        }
    }

})();
