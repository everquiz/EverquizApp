app
  .factory('profileFactory', ['$http', 'authFactory',  profileFactory ]);
  
function profileFactory($http, authFactory) {
  var _this = {};
  var id = authFactory.currentUserId();

  _this.getQuizHistory = getQuizHistory;
  _this.getProfileInfo = getProfileInfo;
  return _this;

  function getProfileInfo() {
    var profile = {};
    profile.email = authFactory.currentUser();
    return profile;
  };

  function getQuizHistory() {
    return $http.get('/api/v1/Users/' + id).then(function(res) {
      return res.data;
    });
  };

}

