app
  .factory('profileFactory', ['$http', 'authFactory',  profileFactory ]);
  
function profileFactory($http, authFactory) {
  var _this = {};
  var id = authFactory.currentUserId();

  _this._isVisible = false;
  _this.isVisible = isVisible,
  _this.getQuizHistory = getQuizHistory;
  _this.showProfile = showProfile;
  _this.hideProfile = hideProfile;
  _this.getQuizStatistic = getQuizStatistic;
  //_this.getProfileInfo = getProfileInfo;
  return _this;

  //function getProfileInfo() {
  //  var profile = {};
  //  profile.email = authFactory.currentUser();
  //  return profile;
  //};

  function getQuizHistory() {
    return $http.get('/api/v1/Users/' + id + '?populate=history').then(function(res) {
      return res.data;
    });
  };

  function getQuizStatistic(history) {
    var result = {};
    if (!history.length) {
      result = {
        averageResult: 0,
        quizCompleted: 0
      }
      return result;
    }
    var averageResult = 0;
    var quizCompleted = 0;
    for (var i = 0; i < history.length; ++i) {
      averageResult += history[i].result;
      if (history[i].isCompleted) quizCompleted
    }

    result = {
      averageResult: averageResult / history.length,
      quizCompleted: quizCompleted
    }

    return result;
  }

  function hideProfile() {
    _this._isVisible = false;
  };

  function showProfile() {
    _this._isVisible = true;
  };

  function isVisible() {
    return _this._isVisible;
  }
}

