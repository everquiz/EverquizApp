app
  .controller('RunQuizzesCtrl', [
    '$scope',
    'quizService',
    'categoryService',
    RunQuizzesCtrl
  ]);

function RunQuizzesCtrl($scope, quizService, categoryService){
  var self = this;
  self.quizzes = quizService.getQuizzes();
  self.categories = [];
  
  self.categories = categoryService.getCategories();
  self.categories.push({'_id': '12', 'title': 'All categories'});

  self.getQuizzesByCategory = getQuizzesByCategory;

  function getQuizzesByCategory() {
    console.log($scope.selected);
    self.quizzes = quizService.getQuizzesByCategory($scope.selected);
  }
}