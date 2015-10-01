(function() {
  'use strict'

  angular
      .module('everquizApp')
      .service('achievementService', achievementService);

  achievementService.$inject = ['$http', 'authFactory'];

  function achievementService($http, authFactory) {
    var self = this;

    function get(id) {
        return $http.get('/api/v1/Achievements/' + id
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