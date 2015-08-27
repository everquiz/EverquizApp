app.controller('QuizCtrl', [
          '$scope', 'quizService', 'quiz', 'questionService',
  function($scope,   quizService,   quiz,   questionService){
    $scope.questions = questionService.getAllByQuiz(quiz);
    $scope.quiz = quiz;

    // $scope.status = 0;

    // $scope.getStatus = function(status) {
    //   var statusTypes = ['Unactive', 'Active'];
    //   return statusTypes[status];
    // }

    $scope.addQuestion = function() {
      if((!$scope.text || $scope.text === '')) { return; }
      if (!$scope.id || $scope.id === '') {
        questionService.create({
          text: $scope.text,
          quiz: quiz
        });
      } 
      // else {
      //   questionService.update({
      //     _id: $scope.id,
      //     text: $scope.text,
      //   });
      // }
      $scope.id = '';
      $scope.text = '';
    };

    // $scope.deactivateQuiz = function(quiz) {
    //   if (confirm('Do you want to make unactive ' + quiz.title + ' ?')) {
    //     quizService.unactive(quiz);
    //   };
    // };

    // $scope.editQuiz = function(quiz) {
    //   console.log(quiz);
    //   $scope.title = quiz.title;
    //   $scope.description = quiz.description;
    //   $scope.id = quiz._id;
    //   $scope.status = quiz.status;
    // };
}]);