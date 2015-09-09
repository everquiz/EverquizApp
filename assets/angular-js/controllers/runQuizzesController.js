app
  .controller('RunQuizzesCtrl', [
    'quizService',
    RunQuizzesCtrl
  ]);

function RunQuizzesCtrl(quizService){
  var self = this;
  self.quizzes = quizService.getQuizzes();
}