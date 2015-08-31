app.controller('QuestionCtrl', [
          '$scope', 'question', 'answerService',
  function($scope,   question,   answerService){
    $scope.answers = question.answers;
    $scope.question = question;

    $scope.editAnswer = function(answer) {
      $scope.answer = answer;
    };

    $scope.addAnswer = function() {
      if ($scope.answer.correct == undefined) {
        $scope.answer.correct = false;
      };
      if((!$scope.answer.text || $scope.answer.text === '')) { return; }
      if (!$scope.answer._id || $scope.answer._id === '') {
        $scope.answer.question = question;
        answerService.create($scope.answer);
      } 
      else {
        answerService.update($scope.answer);
      }
      $scope.answer = '';
    };

    $scope.removeAnswer = function(answer) {
      if (confirm('Do you want to delete this answer?')) {
        answerService.remove(answer, question);
      };
    };

}]);