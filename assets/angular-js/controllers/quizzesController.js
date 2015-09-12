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
      if((!$scope.quiz.title || $scope.quiz.title === '')
        || (!$scope.quiz.description || $scope.quiz.description === '')) { return; }
      if (!$scope.quiz._id || $scope.quiz._id === '') {
        console.log('create');
        quizService.create($scope.quiz);
      } 
      else {
        console.log('update');
        quizService.update($scope.quiz);
      }
      $scope.quiz = {};
    };

    $scope.deactivateQuiz = function(quiz) {
      if (confirm('Do you want to make unactive ' + quiz.title + ' ?')) {
        quizService.unactive(quiz);
      };
    };

    $scope.editQuiz = function(quiz) {
      $scope.quiz = quiz;
    };

    $scope.activateQuiz = function(quiz) {
      quizService.active(quiz);
    };
}]);