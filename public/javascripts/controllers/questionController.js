app.controller('QuestionCtrl', [
          '$scope', 'question', 'answerService',
  function($scope,   question,   answerService){
    $scope.answers = question.answers;
    $scope.question = question;

    $scope.editAnswer = function(answer) {
      $scope.text = answer.text;
      $scope.correct = answer.correct;
      $scope.id = answer._id;
    };

    $scope.addAnswer = function() {
      if ($scope.correct == undefined) {
        $scope.correct = false;
      };
      if((!$scope.text || $scope.text === '')) { return; }
      var answer = {};
      if (!$scope.id || $scope.id === '') {
        answer.text = $scope.text;
        answer.correct = +$scope.correct;
        answer.question = question;
        answerService.create(answer, question);
      } 
      else {
        answer.id = $scope.id;
        answer.text = $scope.text;
        answer.correct = +$scope.correct;
        answerService.update(answer, question);
      }
      $scope.id = '';
      $scope.text = '';
      $scope.correct = '';
    };

    $scope.removeAnswer = function(answer) {
      if (confirm('Do you want to delete this answer?')) {
        answerService.remove(answer, question);
      };
    };

}]);