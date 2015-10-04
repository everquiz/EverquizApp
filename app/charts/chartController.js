(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('ChartController', ChartController);

    ChartController.$inject = ['chartService'];

    function ChartController(chartService) {

        var vm = this;
        vm.updateChart = updateChart;
        vm.cases = chartService.cases;
        vm.case = chartService.average_day;
        vm.Date = chartService.initDate();
        vm.chartParams = vm.case(vm.Date.startDate, vm.Date.endDate);


        function updateChart() {
            vm.chartParams = vm.case(vm.Date.startDate, vm.Date.endDate);
        }
    }
})();
