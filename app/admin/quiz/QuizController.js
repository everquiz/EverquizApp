(function () {

  angular
      .module('everquizApp')
      .controller('QuizController', QuizController);

  QuizController.$inject = ['quiz', 'questionService'];

  function QuizController(quiz,   questionService){
      // vm.questions = quiz.questions;
      // vm.quiz = quiz;

      var vm = this;
      vm.quiz = quiz;
      vm.questions = quiz.questions;
      vm.addQuestion = addQuestion;
      vm.editQuestion = editQuestion;
      vm.removeQuestion = removeQuestion;
      vm.formTitle = 'Add new question';
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

      function addQuestion() {
        if((!vm.question.text || vm.question.text === '')) { return; }
        if (!vm.question._id || vm.question._id === '') {
          vm.question.quiz = quiz;
          questionService.create(vm.question);
        } 
        else {
          questionService.update(vm.question);
        }
        vm.modalToggle();
        vm.question = "";
        vm.formTitle = 'Add new question';
      }

      function editQuestion(question) {
        vm.modalToggle();
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
      function resetTitle () {
        vm.modalToggle();
        vm.question = {};
        vm.formTitle = 'Add new question';
      }
  };
})(); 
  
