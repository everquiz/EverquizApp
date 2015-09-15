(function () {
    'use strict'

    angular
        .module('everquizApp')
        .factory('authFactory', authFactory);

    authFactory.$inject = ['$http', '$window'];

    function authFactory($http, $window) {

        var auth = {
            saveToken: saveToken,
            getToken: getToken,
            isLoggedIn: isLoggedIn,
            checkRole: checkRole,
            isAdmin: isAdmin,
            isUser: isUser,
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
        };

        function getToken() {
            return $window.localStorage['everquizApp-token'];
        };

        function isLoggedIn() {
            var token = auth.getToken();
            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        function checkRole() {
            return $http.get('/status', {
                headers: {Authorization: 'Bearer ' + auth.getToken()}
            }).success(function (data) {
                if (data === 'admin') {
                    console.log(data);
                    return true;
                } else {
                    return false;
                }
            });
        }

        function isAdmin() {
            if (auth.isLoggedIn()) {
                var token = auth.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                if (payload.roles[0] === 'admin') {
                    return true
                }
                ;
                return false;
            }
        };

        function isUser() {
            var token = auth.getToken();
            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                console.log('isUser()');


                $http.get('/status', {
                    headers: {Authorization: 'Bearer ' + auth.getToken()}
                }).success(function (data) {
                    if (data === 'user') {
                        console.log(data);
                        return true;
                    }
                    ;
                })
            } else {
                return false;
            }
        };

        function currentUser() {
            if (auth.isLoggedIn()) {
                var token = auth.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.email;
            }
        };

        function currentUserId() {
            if (auth.isLoggedIn()) {
                var token = auth.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload._id;
            }
        };


        function register(user) {
            return $http.post('/register', user).success(function (data) {
                auth.saveToken(data.token);
            });
        };

        function logIn(user) {
            return $http.post('/login', user).success(function (data) {
                auth.saveToken(data.token);
            });
        };


        function logOut() {
            $window.localStorage.removeItem('everquizApp-token');
        };
    }

})();