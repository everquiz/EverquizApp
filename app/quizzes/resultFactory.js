(function(){
    'use strict';

    angular
        .module('everquizApp')
        .factory('resultFactory', resultFactory);

    resultFactory.$inject = ['$http', 'authFactory', 'profileFactory'];

    function resultFactory($http, authFactory, profileFactory){
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
                    profileFactory.updateProfile();
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