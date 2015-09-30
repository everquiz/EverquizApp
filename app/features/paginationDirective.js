(function () {
    'use strict';

    angular
        .module('everquizApp')
        .directive("eqPagination", eqPagination);

        function eqPagination() {
            return {
                template: '<div class="notes-list-pagination">' +
                '<ul class="notes-list-pagination-buttonset">' +
                '<li class="notes-list-pagination-buttonset-item" ng-click="goToFirstPage()"> <span class="notes-list-pagination-buttonset-item__title is-first">First</span> </li> ' +
                '<li class="notes-list-pagination-buttonset-item" ng-click="goToPreviousPage()"> <span class="notes-list-pagination-buttonset-item__title">&laquo;</span> </li> ' +
                '<li class="notes-list-pagination-buttonset-item" ng-click="goToPage(page)" ng-repeat="page in pageList" ' +
                'ng-class=' + '"{' +
                "'is-active'" +
                ': activePage === page}"> ' +
                '<span class="notes-list-pagination-buttonset-item__title">{{page + 1}}</span></li>' +
                '<li class="notes-list-pagination-buttonset-item" ng-click="goToNextPage()"><span class="notes-list-pagination-buttonset-item__title">&raquo;</span></li>' +
                '<li class="notes-list-pagination-buttonset-item" ng-click="goToLastPage()"> <span class="notes-list-pagination-buttonset-item__title is-last">Last</span> </li> ' +
                '</ul> ' +
                '</div>',
                restrict: 'E',
                replace: true,
                scope: {
                    viewList: '=',
                    limit: '=',
                    filter: '='
                },
                link: function (scope, element, attributes) {

                    //Methods
                    scope.goToFirstPage = goToFirstPage;
                    scope.goToLastPage = goToLastPage;
                    scope.goToNextPage = goToNextPage;
                    scope.goToPreviousPage = goToPreviousPage;
                    scope.goToPage = goToPage;
                    scope.$parent.pageFilter = pageFilter;

                        //Properties
                    scope.activePage = 0;
                    scope.pageList = [];
                    scope.numPages = 0;

                    //Watchers
                    scope.$watch('viewList.length',function(value){
                        scope.numPages = (value / scope.limit) >> 0;
                        if (value % scope.limit !== 0) scope.numPages++;
                        scope.pageList.length = scope.numPages;
                        for (var i = 0; i < scope.numPages; ++i) scope.pageList[i] = i;
                    });

                    //Implementation
                    function goToFirstPage() {
                        scope.activePage = 0;
                        console.log(scope.activePage);
                    };

                    function goToLastPage() {
                        scope.activePage = scope.numPages - 1;
                        console.log(scope.activePage);
                    };

                    function goToNextPage() {
                        if (scope.activePage < scope.numPages - 1) scope.activePage++;
                        console.log(scope.activePage);
                    };

                    function goToPreviousPage() {
                        if (scope.activePage > 0) scope.activePage--;
                        console.log(scope.activePage);
                    };
                    function goToPage(num) {
                        scope.activePage = num;
                        console.log(scope.activePage);
                    };

                    function pageFilter(index) {
                        return ( (scope.activePage * scope.limit <= index) &&
                        (index < scope.activePage * scope.limit + scope.limit));
                    }
                }

            }
        };

})();