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
    vm.formTitle = 'Add new answer';
    vm.resetTitle = resetTitle;
    vm.modalToggle = modalToggle;

    function modalToggle() {
      var modal = document.getElementById('modal');
      if (modal.style.opacity == 0) {
        console.log('opacity 0')
        modal.style.display = 'block';
        modal.style.opacity = 1;
      } else {
        console.log('opacity 1')
        modal.style.opacity = 0;
        modal.style.display = 'none';
      }
    }

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
      vm.modalToggle();
      vm.answer = '';
      vm.formTitle = 'Add new answer';
    }

    function editAnswer(answer) {
      vm.modalToggle();
      vm.answer = answer;
      vm.formTitle = 'Edit answer';
    }

    function removeAnswer(answer) {
      if (confirm('Do you want to delete this answer?')) {
        answerService.remove(answer, question);
        vm.answer = '';
        vm.formTitle = 'Add new answer';
      }
    }
    function resetTitle () {
      vm.answer = {};
      vm.formTitle = 'Add new answer';
      vm.modalToggle();
    }
  }
  
})();
