(function() {
  'use strict';

  angular
      .module('everquizApp')
      .controller('QuestionController', QuestionController);

  QuestionController.$inject = ['question', 'answerService'];
  
  function QuestionController(question,   answerService) {
    // vm.answers = question.answers;
    // vm.question = question;
    var vm = this;
    vm.question = question;
    vm.answers = question.answers;
    vm.addAnswer = addAnswer;
    vm.editAnswer = editAnswer;
    vm.removeAnswer = removeAnswer;

    function addAnswer() {
      if (vm.answer.correct == undefined) {
        vm.answer.correct = false;
      };
      if((!vm.answer.text || vm.answer.text === '')) { return; }
      if (!vm.answer._id || vm.answer._id === '') {
        vm.answer.question = question;
        answerService.create(vm.answer);
      }
      else {
        answerService.update(vm.answer);
      }
      vm.answer = '';
    };

    function editAnswer(answer) {
      vm.answer = answer;
    };

    function removeAnswer(answer) {
      if (confirm('Do you want to delete this answer?')) {
        answerService.remove(answer, question);
      };
    };
  }
  
})();