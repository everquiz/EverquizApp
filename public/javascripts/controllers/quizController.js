app.controller('QuizCtrl', [
          '$scope', 'quizService',
  function($scope,   quizService){
    $scope.test = 'Hello world!';

    $scope.quizzes = quizService.quizzes;

    $scope.addQuiz = function() {
      if((!$scope.title || $scope.title === '')
        || (!$scope.description || $scope.description === '')) { return; }
      if (!$scope.id || $scope.id === '') {
        quizService.create({
          title: $scope.title,
          description: $scope.description
        });
      } 
      // else {
      //   userService.update({
      //     _id: $scope.id,
      //     title: $scope.title,
      //     description: $scope.description,
      //     password: $scope.password
      //   });
      // }
      
      $scope.title = '';
      $scope.description = '';
    };

    // $scope.removeUser = function(user) {
    //   if (confirm('Do you want to delete ' + user.title + ' ?')) {
    //     userService.remove(user);
    //   };
    // };

    // $scope.editUser = function(user) {
    //   console.log(user);
    //   $scope.title = user.title;
    //   $scope.description = user.description;
    //   $scope.id = user._id;
    // };

    // $scope.incrementUpvotes = function(post) {
    //   postService.upvote(post);
    // };
}]);