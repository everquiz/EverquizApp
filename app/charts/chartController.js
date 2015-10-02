(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('ChartController', ChartController);

    ChartController.$inject = ['chartService'];

    function ChartController(chartService) {

        var vm = this;
        vm.updateChart = updateChart
        vm.dates = moment().range("2012-11-05", "2013-01-25")
        vm.cases = chartService.cases;
        vm.case = chartService.average_day
        vm.chartParams = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            series: ["Choose case"],
            data : [[65, 59, 80, 81, 56, 55, 40]],
            colours : ['#FD2828']
        }

        function updateChart() {
            vm.chartParams = vm.case();
        }
    }
})();
