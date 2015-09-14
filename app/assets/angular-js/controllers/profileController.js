app
  .controller('ProfileController', [
    '$scope',
    'profileFactory',
    ProfileController
  ]);

function ProfileController ($scope, profileFactory) {
  var self = this;
  self.isVisible = profileFactory.isVisible;
  self.profile = {};
  profileFactory.getQuizHistory()
      .then(function(data) {
        self.profile = data;

        var result = profileFactory.getQuizStatistic(self.profile.history);
        self.profile.averageResult = result.averageResult;
        self.profile.quizCompleted = result.quizCompleted;
      });
}