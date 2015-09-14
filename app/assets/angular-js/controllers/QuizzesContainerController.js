(function() {
    'use strict';

    app.controller('QuizzesContainerController', QuizzesContainerController);

    QuizzesContainerController.$inject = ['quizService'];
    function QuizzesContainerController (quizService) {
        this.quizService = quizService;
    }
})();