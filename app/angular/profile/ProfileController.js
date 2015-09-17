(function () {
    'use strict';

    angular
        .module('everquizApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['profileFactory'];

    function ProfileController(profileFactory) {

      var vm = this;
      vm.isVisible = profileFactory.isVisible;
      vm.profile = {};
      profileFactory.getQuizHistory()
          .then(function (data) {
            vm.profile = data;

            var result = profileFactory.getQuizStatistic(vm.profile.history);
            vm.profile.averageResult = result.averageResult;
            vm.profile.quizCompleted = result.quizCompleted;
          });
    }

})();
