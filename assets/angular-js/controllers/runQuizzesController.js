app
  .controller('RunQuizzesCtrl', [
    '$scope',
    'quizService',
    'categoryService',
    RunQuizzesCtrl
  ]);

function RunQuizzesCtrl($scope, quizService, categoryService){
  var self = this;
  self.quizzes = quizService.getQuizzes();
}