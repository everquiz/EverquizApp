(function () {
    'use strict';

    angular
        .module('everquizApp')
        .service('chartService', chartService);

    chartService.$inject = ['historyService'];

    function chartService(historyService) {

        var self = this;
        var history = historyService.getHistory();
        self.quiz_day = quiz_day;
        self.quiz_succesful_day = quiz_succesful_day;
        self.average_day = average_day;

        self.initDate = initDate;
        self.startDate = new Date();
        self.endDate = new Date();

        self.cases = [
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
        ];

        function average_day(date_start, date_end) {
            var labels = [];
            var data = [[]];
            var filteredIndex = 0;
            history = historyService.getHistory();
            data[0] = history.getAverageResultProgression();
            for (var i = 0; i < history.length; ++i) {
                var date = new Date(history[i].createdAt);
                if (date >= date_start && date <= date_end) {
                    var dateStr = dateToString(date);
                    labels[filteredIndex++] = dateStr;
                }
            }

            return {
                labels: labels,
                series: ["Average result progression"],
                data: data,
                colours: ['#FD2828']
            }
        }

        function quiz_day(date_start, date_end) {
            history = historyService.getHistory();
            var initDate = new Date(history[0].createdAt);
            var initDateStr = dateToString(initDate);
            var labels = [initDateStr];
            var data = [[1]];
            var dataCounter = 0;
            for (var i = 1; i < history.length; ++i) {
                var date = new Date(history[i].createdAt);
                if (date >= date_start && date <= date_end) {
                    var dateStr = dateToString(date);
                    if (dateStr === labels[dataCounter]) data[0][dataCounter]++;
                    else {
                        dataCounter++;
                        data[0].push(1);
                        labels[dataCounter] = dateStr;
                    }
                }
            }

            return {
                labels: labels,
                series: ["Number of quizzes per date"],
                data: data,
                colours: ['#FD2828']
            }
        }

        function quiz_succesful_day(date_start, date_end) {
            history = historyService.getHistory();
            var initDate = new Date(history[0].createdAt);
            var initDateStr = dateToString(initDate);
            var labels = [initDateStr];
            var data = [[1]];
            var dataCounter = 0;
            for (var i = 1; i < history.length; ++i) {
                if (history[i].result > 0.6) {
                    var date = new Date(history[i].createdAt);
                    if (date >= date_start && date <= date_end) {
                        var dateStr = dateToString(date);
                        if (dateStr === labels[dataCounter]) {
                            data[0][dataCounter]++;
                        }
                        else {
                            dataCounter++;
                            data[0].push(1);
                            labels[dataCounter] = dateStr;
                        }
                    }
                }
            }

            var series = ["Number of succesful quizzes per date"];
            //if (data[0].length === 1 && data[0][0] === 1) {
            //    data = [[]];
            //    labels = [];
            //    series = ["No succesful quizzes"];
            //}
            console.log(data);
            return {
                labels: labels,
                series: series,
                data: data,
                colours: ['#FD2828']
            }
        }

        function initDate() {
            for (var i = history.length - 1; i >= history.length - 7; --i) {
                if (history[i] === undefined) break;
                else self.startDate = new Date(history[i].createdAt);
            }
            return {
                startDate: self.startDate,
                endDate: self.endDate
            }
        }

        function dateToString(date) {
            return date.getFullYear().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getDate().toString();
        }
    }

})();
