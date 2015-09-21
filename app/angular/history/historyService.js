(function () {
    'use strict'

    angular
        .module('everquizApp')
        .service('historyService', historyService);

    historyService.$inject = ['$http', 'authFactory'];

    function historyService($http, authFactory) {
        var vm = this;
        vm.getHistory = getHistory;

        function getHistory() {
            var id = authFactory.currentUserId();
            if (id) {
                return $http.get('/api/v1/Histories?user=' + id).then(function (res) {
                    return res.data;
                });
            }
        }
    }
})();