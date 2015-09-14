(function () {
    'use strict';

    app.controller('PassingQuizCtrl', [
        'quizService',
        PassingQuizCtrl
    ]);

    function PassingQuizCtrl(quizService) {
        var self = this;
        self.quizService = quizService;
        self.checkResult = checkResult;

        quizService.get(quizService.activeQuiz).then(
            function (data) {
                self.quiz = data;
            }
        )

        quizService.getAnswers(quizService.activeQuiz).then(
            function (data) {
                self.quiz.questions = data;
            }
        )

        function checkResult() {
            quizService.checkResult(self.quiz).then(
                function (data) {
                    self.result = data;
                }
            )
        }
    }
})();