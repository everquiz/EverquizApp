;(function() {
    'use strict';

    angular
        .module('everquizApp')
        .controller('QuizController', QuizController);

    QuizController.$inject = ['quiz', 'questionService'];

    function QuizController(quiz, questionService) {
        var vm = this;
        vm.quiz = quiz;
        vm.questions = quiz.questions;
        vm.addQuestion = addQuestion;
        vm.editQuestion = editQuestion;
        vm.removeQuestion = removeQuestion;
        vm.formTitle = 'Add new question';
        vm.resetTitle = resetTitle;

        function addQuestion() {
            if ((!vm.question.text || vm.question.text === '')) {
                return;
            }
            if (!vm.question._id || vm.question._id === '') {
                vm.question.quiz = quiz;
                questionService.create(vm.question);
            } else {
                questionService.update(vm.question);
            }
            vm.question = "";
            vm.formTitle = 'Add new question';
        }

        function editQuestion(question) {
            vm.question = question;
            vm.formTitle = 'Edit question';
        }

        function removeQuestion(question) {
            if (confirm('Do you want to delete this question?')) {
                questionService.remove(question, quiz);
                vm.question = "";
                vm.formTitle = 'Add new question';
            }
        }

        function resetTitle() {
            vm.question = {};
            vm.formTitle = 'Add new question';
        }
    };
})();