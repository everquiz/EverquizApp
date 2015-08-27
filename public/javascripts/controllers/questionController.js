app.controller('QuestionCtrl', [
          '$scope', 'questionService', 'question', 'answerService',
  function($scope,   questionService,   question,   answerService){
    $scope.answers = answerService.getAllByQuestion(question);
    $scope.question = question;

    // $scope.addQuestion = function() {
    //   if((!$scope.text || $scope.text === '')) { return; }
    //   if (!$scope.id || $scope.id === '') {
    //     questionService.create({
    //       text: $scope.text,
    //       quiz: quiz
    //     });
    //   } 
    //   else {
    //     questionService.update({
    //       _id: $scope.id,
    //       text: $scope.text,
    //     });
    //   }
    //   $scope.id = '';
    //   $scope.text = '';
    // };

    // $scope.editQuestion = function(question) {
    //   $scope.text = question.text;
    //   $scope.id = question._id;
    // };
}]);