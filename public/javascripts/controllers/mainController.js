app.controller('MainCtrl', [
          '$scope', 'userService',
  function($scope,   userService){
    $scope.test = 'Hello world!';

    $scope.users = userService.users;

    $scope.addUser = function() {
      if((!$scope.user.name || $scope.user.name === '')
        || (!$scope.user.email || $scope.user.email === '') 
        // || (!$scope.user.password || $scope.user.password === '')
        // || (!$scope.user.passwordRepeat || $scope.user.passwordRepeat === '')
      ) { return; }
      if (!$scope.user._id || $scope.user._id === '') {
        // userService.create({
        //   name: $scope.name,
        //   email: $scope.email,
        //   password: $scope.password
        // });
      } else {
        console.log($scope.user);
        userService.update($scope.user);
      }
      
      $scope.user = '';
    };

    $scope.removeUser = function(user) {
      if (confirm('Do you want to delete ' + user.name + ' ?')) {
        userService.remove(user);
      };
    };

    $scope.editUser = function(user) {
      $scope.user = user;
    };

    $scope.incrementUpvotes = function(post) {
      postService.upvote(post);
    };
}]);