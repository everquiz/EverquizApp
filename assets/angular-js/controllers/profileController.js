app
  .controller('ProfileController', [
    '$scope',
    'profileFactory',
    ProfileController
  ]);

function ProfileController ($scope, profileFactory) {
  var self = this;
  self.profile = profileFactory.getStatus;
}