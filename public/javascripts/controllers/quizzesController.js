app.controller('QuizzesCtrl', [
          '$scope', 'quizService',
  function($scope,   quizService){
    $scope.quizzes = quizService.quizzes;

    $scope.status = 0;

    $scope.getStatus = function(status) {
      var statusTypes = ['Unactive', 'Active'];
      return statusTypes[status];
    }

    $scope.addQuiz = function() {
      if((!$scope.title || $scope.title === '')
        || (!$scope.description || $scope.description === '')) { return; }
      if (!$scope.id || $scope.id === '') {
        quizService.create({
          title: $scope.title,
          description: $scope.description
        });
      } 
      else {
        quizService.update({
          _id: $scope.id,
          title: $scope.title,
          description: $scope.description,
          status: $scope.status
        });
      }
      $scope.id = '';
      $scope.title = '';
      $scope.description = '';
    };

    $scope.deactivateQuiz = function(quiz) {
      if (confirm('Do you want to make unactive ' + quiz.title + ' ?')) {
        quizService.unactive(quiz);
      };
    };

    $scope.editQuiz = function(quiz) {
      console.log(quiz);
      $scope.title = quiz.title;
      $scope.description = quiz.description;
      $scope.id = quiz._id;
      $scope.status = quiz.status;
    };
}]);