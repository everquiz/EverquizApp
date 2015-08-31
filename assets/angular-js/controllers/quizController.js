app.controller('QuizCtrl', [
          '$scope', 'quiz', 'questionService',
  function($scope,   quiz,   questionService){
    $scope.questions = quiz.questions;
    $scope.quiz = quiz;

    $scope.editQuestion = function(question) {
      $scope.question = question;
    };

    $scope.addQuestion = function() {
      if((!$scope.question.text || $scope.question.text === '')) { return; }
      if (!$scope.question._id || $scope.question._id === '') {
        $scope.question.quiz = quiz;
        questionService.create($scope.question);
      } 
      else {
        questionService.update($scope.question);
      }
      $scope.question = "";
    };

    $scope.removeQuestion = function(question) {
      if (confirm('Do you want to delete this question?')) {
        questionService.remove(question, quiz);
      };
    };

    
}]);