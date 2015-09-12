app
  .controller('ProfileController', [
    '$scope',
    'profileFactory',
    ProfileController
  ]);

function ProfileController ($scope, profileFactory) {
  var self = this;
  self.profile = {};
  self.profile.info = profileFactory.getProfileInfo();
  profileFactory.getQuizHistory()
      .then(function(data) {
        self.profile.quiz = data;
      });
}