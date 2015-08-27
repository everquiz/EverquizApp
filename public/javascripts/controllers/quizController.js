app.controller('QuizCtrl', [
          '$scope', 'quizService', 'quiz', 'questionService',
  function($scope,   quizService,   quiz,   questionService){
    $scope.questions = questionService.getAllByQuiz(quiz);
    $scope.quiz = quiz;

    $scope.addQuestion = function() {
      if((!$scope.text || $scope.text === '')) { return; }
      if (!$scope.id || $scope.id === '') {
        questionService.create({
          text: $scope.text,
          quiz: quiz
        });
      } 
      else {
        questionService.update({
          _id: $scope.id,
          text: $scope.text,
        });
      }
      $scope.id = '';
      $scope.text = '';
    };

    $scope.editQuestion = function(question) {
      $scope.text = question.text;
      $scope.id = question._id;
    };
}]);