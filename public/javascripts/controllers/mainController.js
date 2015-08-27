app.controller('MainCtrl', [
          '$scope', 'userService',
  function($scope,   userService){
    $scope.test = 'Hello world!';

    $scope.users = userService.users;

    $scope.addUser = function() {
      if((!$scope.name || $scope.name === '')
        || (!$scope.email || $scope.email === '') 
        || (!$scope.password || $scope.password === '')
        || (!$scope.passwordRepeat || $scope.passwordRepeat === '')) { return; }
      if (!$scope.id || $scope.id === '') {
        userService.create({
          name: $scope.name,
          email: $scope.email,
          password: $scope.password
        });
      } else {
        userService.update({
          _id: $scope.id,
          name: $scope.name,
          email: $scope.email,
          password: $scope.password
        });
      }
      
      $scope.name = '';
      $scope.email = '';
      $scope.password = '';
      $scope.passwordRepeat = '';
    };

    $scope.removeUser = function(user) {
      if (confirm('Do you want to delete ' + user.name + ' ?')) {
        userService.remove(user);
      };
    };

    $scope.editUser = function(user) {
      console.log(user);
      $scope.name = user.name;
      $scope.email = user.email;
      $scope.id = user._id;
    };

    $scope.incrementUpvotes = function(post) {
      postService.upvote(post);
    };
}]);