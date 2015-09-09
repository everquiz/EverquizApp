app.service('categoryService', function ($http) {
  var _self = {};
  _self.categories = [];
  /**
   * For user section
   */
  this.getCategories = function() {
    $http.get('/api/v1/Categories?select=_id,title').then(function(res) {
      angular.copy(res.data, _self.categories);
    });
    return _self.categories;
  }
});