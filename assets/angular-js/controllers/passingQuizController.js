app
    .controller('PassingQuizCtrl', [
        '$scope',
        'quizService',
        PassingQuizCtrl
    ]);

function PassingQuizCtrl($scope, quizService){
    var self = this;

    self
    self.quiz = quizService.get('55e00c58631bbb250ef4ae24');
}