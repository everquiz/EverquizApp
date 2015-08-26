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
      userService.create({
        name: $scope.name,
        email: $scope.email,
        password: $scope.password
      });
      $scope.name = '';
      $scope.email = '';
      $scope.password = '';
      $scope.passwordRepeat = '';
    };

    $scope.removeUser = function(user) {
      if (confirm('Do you want to delete ' + user.name + ' ?')) {
        userService.remove(user);
      };
    }

    // $scope.addPost = function(){
    //   if(!$scope.title || $scope.title === '') { return; }
    //   postService.create({
    //     title: $scope.title,
    //     link: $scope.link,
    //   });
    //   $scope.title = '';
    //   $scope.link = '';
    // };
    // $scope.incrementUpvotes = function(post) {
    //   postService.upvote(post);
    // };
}]);