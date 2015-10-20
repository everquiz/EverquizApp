;(function () {
    'use strict';

    angular
        .module('everquizApp')
        .factory('authFactory', authFactory);

    authFactory.$inject = ['$http', '$window'];

    function authFactory($http, $window) {

        var auth = {
            saveToken: saveToken,
            getToken: getToken,
            isLoggedIn: isLoggedIn,
            isAdmin: isAdmin,
            // isUser: isUser, //TODO Delete?
            currentUser: currentUser,
            currentUserId: currentUserId,
            register: register,
            logIn: logIn,
            logOut: logOut
        };
        //*****************************************************
        return auth;


        function saveToken(token) {
            $window.localStorage['everquizApp-token'] = token;
        }

        function getToken() {
            return $window.localStorage['everquizApp-token'];
        }

        function isLoggedIn() {
            var token = auth.getToken();
            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        }

        function isAdmin() {
            if (auth.isLoggedIn()) {
                var token = auth.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return (payload.roles[0] === 'admin');
            }
        }

        // TODO Delete? Nowhere used
        // function isUser() {
        //     var token = auth.getToken();
        //     if (token) {
        //         var payload = JSON.parse($window.atob(token.split('.')[1]));


        //         $http.get('/status', {
        //             headers: {Authorization: 'Bearer ' + auth.getToken()}
        //         }).success(function (data) {
        //             if (data === 'user') {
        //                 return true;
        //             }
        //         })
        //     } else {
        //         return false;
        //     }
        // }

        function currentUser() {
            if (auth.isLoggedIn()) {
                var token = auth.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.email;
            }
        }

        function currentUserId() {
            if (auth.isLoggedIn()) {
                var token = auth.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload._id;
            }
        }


        function register(user) {
            return $http.post('/register', user).success(function (data) {
                auth.saveToken(data.token);
            });
        }

        function logIn(user) {
            return $http.post('/login', user).success(function (data) {
                auth.saveToken(data.token);
            });
        }


        function logOut() {
            $window.localStorage.removeItem('everquizApp-token');
        }
    }

})();