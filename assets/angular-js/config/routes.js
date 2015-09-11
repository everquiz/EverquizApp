app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    // Handler for Restricting Access to a page using the state.resolve call
    var accessUser = function(authFactory, $state) {
      if (!authFactory.isLoggedIn()) {
        alert('You have to login');
        $state.go('/login');
      };
    };

    var accessAdmin = function(authFactory, $state) {
      if (!authFactory.isAdmin()) {
        alert('You have to be admin to be here');
        $state.go('/login');
      };
    };

    $stateProvider
      .state('/', {
        url: '/',
        templateUrl: 'views/home/home.html'
      })
      .state('users', {
        url: '/users',
        templateUrl: 'views/partials/users.html',
        controller: 'MainCtrl',
        resolve: {
          userPromise: ['userService', 
          function(userService){
            return userService.getAll();
          }]
        }
      })
      .state('dashboard', {
        url: '/dashboard/{id}',
        templateUrl: 'views/partials/dashboard.html',
        controller: 'UserCtrl',
        resolve: {
          user: ['$stateParams', 'userService', 
          function($stateParams,  userService) {
            return userService.get($stateParams.id);
          }]
        }
      })
      .state('quizzes', {
        url: '/quizzes',
        templateUrl: 'views/partials/quizzes.html',
        controller: 'QuizzesCtrl',
        resolve: {
          userPromise: ['quizService', 
          function(quizService){
            return quizService.getAll();
          }]
        }
      })
      .state('quiz', {
        url: '/quiz/{id}',
        templateUrl: 'views/partials/quiz.html',
        controller: 'QuizCtrl',
        resolve: {
          quiz: ['$stateParams', 'quizService', 
          function($stateParams,  quizService) {
            return quizService.get($stateParams.id);
          }]
        }
      })
      .state('question', {
        url: '/quiz/{quizId}/question/{id}',
        templateUrl: 'views/partials/question.html',
        controller: 'QuestionCtrl',
        resolve: {
          question: ['$stateParams', 'questionService', 
          function($stateParams,  questionService) {
            return questionService.get($stateParams.id);
          }]
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/partials/auth/login.html',
        controller: 'AuthCtrl'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'views/partials/auth/register.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'authFactory', function($state, authFactory){
          if(authFactory.isLoggedIn()){
            $state.go('home');
          }
        }]
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'views/admin/index.html',
        controller: 'AdminCtrl',
        resolve: { loginRequired : accessAdmin } 
      });

    $urlRouterProvider.otherwise('/');
}]);