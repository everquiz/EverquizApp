(function() {
  'use strict'

  angular
      .module('everquizApp')
      .service('categoryService', categoryService);

  categoryService.$inject = ['$http'];

  function categoryService($http) {
    var self = {};
    self.categories = [];
    /**
     * For user section
     */
    this.getCategories = function () {
      return $http.get('/api/v1/Categories?select=_id,title,description').then(function (res) {
        return res.data;
      });
    };

    /**
     * For admin section
     */
    this.create = function (category) {
        return $http.post('/api/v1/Categories', category).success(function (data) {
            self.categories.push(data);
        });
    };

    this.get = function (id) {
            return $http.get('/api/v1/Categories/' + id + '?select=title')
                .then(function (res) {
                    return res.data;
                });
        };

    this.update = function (category) {
        return $http.put('/api/v1/Categories/' + category._id, category);
    };
    this.getAll = function () {
      $http.get('/api/v1/Categories?select=_id,title,description').then(function (res) {
        angular.copy(res.data, self.categories);
      });ies;
      return self.categor
    };
    this.remove = function(category) {
      return $http.delete('/api/v1/Categories/' + category._id, category).then(function (res) {
        self.categories.splice(self.categories.indexOf(category), 1);
      });
    };
  }

})();