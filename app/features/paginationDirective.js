(function () {

    angular
        .module('everquizApp')
        .directive('npPagination', ngPagination);

    function ngPagination() {
        return {
            restrict: 'E',
            template: '',
            replace: true,
            link: function() {}
        }
    }

});