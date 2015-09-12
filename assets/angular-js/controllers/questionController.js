app.controller('QuestionController', [
          '$scope', 'question', 'answerService',
  function($scope,   question,   answerService){
    // $scope.answers = question.answers;
    // $scope.question = question;
    var self = this;
    self.question = question;
    self.answers = question.answers;
    self.addAnswer = addAnswer;
    self.editAnswer = editAnswer;
    self.removeAnswer = removeAnswer;
    return self;

    function addAnswer() {
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
    
    function editAnswer(answer) {
      $scope.answer = answer;
    };

    function removeAnswer(answer) {
      if (confirm('Do you want to delete this answer?')) {
        answerService.remove(answer, question);
      };
    };

    

    

}]);