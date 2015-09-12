app.controller('QuizzesController', [
          '$scope', 'quizzes', 'quizService', 'categoryService',
  function($scope,   quizzes,   quizService,   categoryService){
    // $scope.quizzes = quizService.quizzes;

    var self = this;
    self.status = 0;
    self.quizzes = quizzes;
    self.categories = categoryService.getCategories();
    self.addQuiz = addQuiz;
    self.editQuiz = editQuiz;
    self.getStatus = getStatus;
    self.deactivateQuiz = deactivateQuiz;
    self.activateQuiz = activateQuiz;
    return self;

    function activateQuiz(quiz) {
      quizService.active(quiz);
    };

    function deactivateQuiz(quiz) {
      if (confirm('Do you want to make unactive ' + quiz.title + ' ?')) {
        quizService.unactive(quiz);
      };
    };

    function getStatus(status) {
      var statusTypes = ['Unactive', 'Active'];
      return statusTypes[status];
    };

    function editQuiz(quiz) {
      console.log($scope.quiz);
      $scope.quiz = quiz;
    };

    function addQuiz() {
      console.log($scope.quiz);
      if((!$scope.quiz.title || $scope.quiz.title === '')
        || (!$scope.quiz.description || $scope.quiz.description === '')) { return; }
      if (!$scope.quiz._id || $scope.quiz._id === '') {
        quizService.create($scope.quiz);
      }
      else {
        quizService.update($scope.quiz);
      }
      $scope.quiz = {};
    };
}]);