(function() {
  'use strict'

  angular
      .module('everquizApp')
      .factory('profileFactory', profileFactory);

  profileFactory.$inject = ['$http', 'authFactory'];

  function profileFactory($http, authFactory) {
    var profile = {};
    var display = false;

    var service = {
      updateProfile: updateProfile,
      showProfile: showProfile,
      hideProfile: hideProfile,
      isVisible: isVisible
      };

    return service;

    function updateProfile() {
      var id = authFactory.currentUserId();
      if (id) {
        return $http.get('/api/v1/Users/' + id + '?populate=history').then(function (res) {
          profile = res.data;

          var result = getQuizStatistic(profile.history);
          profile.averageResult = result.averageResult;
          profile.quizCompleted = result.quizCompleted;
          return profile;
        });
      }
    }

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
        if (history[i].isCompleted) quizCompleted++;
      }

      result = {
        averageResult: averageResult / history.length,
        quizCompleted: quizCompleted
      }

      return result;
    }

    function hideProfile() {
      display = false;
    };

    function showProfile() {
      display = true;
    };

    function isVisible() {
      return display;
    }
  }

})();

