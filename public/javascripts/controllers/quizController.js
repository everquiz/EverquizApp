app.controller('QuizCtrl', [
          '$scope', 'quiz', 'questionService',
  function($scope,   quiz,   questionService){
    $scope.questions = quiz.questions;
    $scope.quiz = quiz;

    $scope.editQuestion = function(question) {
      $scope.text = question.text;
      $scope.id = question._id;
    };

    $scope.addQuestion = function() {
      if((!$scope.text || $scope.text === '')) { return; }
      var question = {};
      if (!$scope.id || $scope.id === '') {
        question.text = $scope.text;
        question.quiz = quiz;
        questionService.create(question, quiz);
      } 
      else {
        question.id = $scope.id;
        question.text = $scope.text;
        question.quiz = quiz;
        questionService.update(question);
        $scope.id = '';
        
      }
      $scope.text = '';
    };

    $scope.removeQuestion = function(question) {
      if (confirm('Do you want to delete this question?')) {
        questionService.remove(question, quiz);
      };
    };

    
}]);