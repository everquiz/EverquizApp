(function() {
  'use strict'

  angular
      .module('everquizApp')
      .service('achievementService', achievementService);

  achievementService.$inject = ['$http', 'authFactory'];

  function achievementService($http, authFactory) {
    var self = this;
    self.get = get;
    self.getAll = getAll;
    self.create = create;

    function get(id) {
        return $http.get('/api/v1/Achievements/' + id)
          .then(function (res) {
            return res.data;
          });
    }

    function getAll() {
      return $http.get('/api/v1/Achievements?select=title,description')
        .then(function (res) {
          return res.data;
        });
    }

    function create (achievment) {
      return $http.post('/api/v1/Achievements', achievment);
    }
  }
})();