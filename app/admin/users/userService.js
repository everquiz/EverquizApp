;(function() {
    'use strict';

    angular
        .module('everquizApp')
        .service('userService', userService);

    userService.$inject = ['$http', 'authFactory'];

    function userService($http, authFactory) {

        var self = this;
        self.users = [];

        self.getAll = getAll;
        self.get = get;
        self.update = update;
        self.create = create;

        function getAll() {
            $http.get('/api/v1/Users', {
                headers: {
                    Authorization: 'Bearer ' + authFactory.getToken()
                }
            }).then(function(res) {
                angular.copy(res.data, self.users);
            });
            return self.users;

        }

        function get(id) {
            return $http.get('/api/v1/Users/' + id + '?populate=notes', {
                headers: {
                    Authorization: 'Bearer ' + authFactory.getToken()
                }
            }).then(function(res) {
                return res.data;
            });
        }

        function update(user) {
            return $http.put('/api/v1/Users/' + user._id, user, {
                headers: {
                    Authorization: 'Bearer ' + authFactory.getToken()
                }
            });
        }

        function create(user) {
            return $http.post('/api/v1/Users', user, {
                headers: {
                    Authorization: 'Bearer ' + authFactory.getToken()
                }
            }).success(function(data) {
                self.users.push(data);
            })
        }
    };
})();