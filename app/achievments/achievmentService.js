(function() {
  'use strict'

  angular
      .module('everquizApp')
      .service('achievmentService', achievmentService);

  achievmentService.$inject = ['$http', 'authFactory'];

  function achievmentService($http, authFactory) {
    var self = this;

    function get(id) {
        return $http.get('/api/v1/Achievments/' + id
        //   , {
        //     headers: {Authorization: 'Bearer ' + authFactory.getToken()}
        // }
        )
        .then(function (res) {
            return res.data;
        });
    }
  }
})();