(function () {
    'use strict';

    app.controller('PassingQuizCtrl', [
        'quizService',
        PassingQuizCtrl
    ]);

    function PassingQuizCtrl(quizService) {
        var self = this;

        quizService.get(quizService.activeQuiz).then(
            function (data) {
                self.quiz = data;
            }
        )
    }
})();