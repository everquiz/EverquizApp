(function () {
    'use strict';

    angular
        .module('everquizApp')
        .factory('resultFactory', resultFactory);

    resultFactory.$inject = ['$http', 'authFactory', 'profileFactory', 'historyService'];

    function resultFactory($http, authFactory, profileFactory, historyService) {
        var lastResult = null;

        var factory = {
            setLastResult: setLastResult,
            getLastResult: getLastResult,
            checkResult: checkResult
        };

        return factory;

        function checkResult(result) {
            return $http.put('/checkresult', result, {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            })
                .then(function (res) {
                    lastResult = Math.round(res.data.result * 100);
                    profileFactory.addAchievement('5614d7cd60a7a12614a331b6');
                    if (lastResult === 100) {
                        profileFactory.addAchievement('5614d7cd60a7a12614a331b5');
                    }
                    profileFactory.updateProfile();
                    historyService.getHistory();
                    return res.data;
                })
        }

        function getLastResult() {
            return lastResult;
        }

        function setLastResult(result) {
            lastResult = result;
        }
    }
})();