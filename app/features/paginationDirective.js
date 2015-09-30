(function () {
    'use strict';

    angular
        .module('everquizApp')
        .directive("eqPagination", eqPagination);

        function eqPagination() {
            return {
                template: "<ul><li>First page</li><li>Previous page</li><li ng-repeat='page in pageList'>{{page}}</li><li>Next page</li><li>Last page</li></ul>",
                restrict: 'E',
                replace: true,
                scope: {
                    elemList: '=',
                    limit: '@',
                    pageNum: '@',
                    pageList: '@'
                },
                controller: function($scope) {

                },
                link: function ($scope, element, attributes) {
                    var activePage = 1;
                    $scope.pageNum = 1;
                    $scope.pageList = [];

                    $scope.$watch("elemList", function(value) {
                        if (value === undefined) return;

                        $scope.pageNum = (value.length / $scope.limit) >> 0;
                        if (value.length % $scope.limit !== 0) $scope.pageNum++;

                        $scope.pageList = [];
                        for (var i = 0; i < $scope.pageNum - 1; ++i) $scope.pageList[i] = i + 1;
                        console.log($scope.pageList);
                    });

                    element.bind('click', function () {
                        console.log($scope.elemList.length);
                    });
                }

            }
        };

})();