(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('ChartController', ChartController);

    ChartController.$inject = ['historyService'];

    function ChartController(historyService) {

        var vm = this;
        console.log(historyService.history);
        vm.title = "TITLE"
        vm.labels = ["January", "February", "March", "April", "May", "June", "July"];
        vm.series = ["Quizzes results %"];
        vm.data = [[65, 59, 80, 81, 56, 55, 40]];
        vm.colours = ['#FD2828', '#FD2828'];
        vm.onClick = function (points, evt) {
            vm.labels = [];
            vm.data = [[]];
            for (var i = 0; i < historyService.history.length; ++i) {
                var date = new Date(historyService.history[i].createdAt);
                var dateStr = date.getFullYear().toString() + '/' + (date.getMonth() + 1).toString() + '/' +  date.getDay().toString();
                vm.labels[i] = dateStr;
                vm.data[0][i] = historyService.history[i].result * 100;
            }
        };
    }
})();
