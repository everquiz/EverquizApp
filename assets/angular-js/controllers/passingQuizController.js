(function () {
    'use strict';

    app.controller('PassingQuizCtrl', [
        'quizService',
        PassingQuizCtrl
    ]);

    function PassingQuizCtrl(quizService) {
        var self = this;

        quizService.getAnswers(quizService.activeQuiz).then(
            function (data) {
                self.questions = data;
            }
        )

    }
})();