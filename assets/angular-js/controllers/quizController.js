;(function () {
  app.controller('QuizController', [
            '$scope', 'quiz', 'questionService',
    function($scope,   quiz,   questionService){
      // $scope.questions = quiz.questions;
      // $scope.quiz = quiz;

      var self = this;
      self.quiz = quiz;
      self.questions = quiz.questions;
      self.addQuestion = addQuestion;
      self.editQuestion = editQuestion;
      self.removeQuestion = removeQuestion;
      return self;

      function addQuestion() {
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

      function editQuestion(question) {
        $scope.question = question;
      };

      function removeQuestion(question) {
        if (confirm('Do you want to delete this question?')) {
          questionService.remove(question, quiz);
        };
      };

      

      
  }]);
})(); 
  