app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/'
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
        controller: 'AuthCtrl',
        onEnter: ['$state', 'authFactory', function($state, authFactory){
          if(authFactory.isLoggedIn()){
            $state.go('home');
          }
        }]
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
      });
      // .state('posts', {
      //   url: '/posts/{id}',
      //   templateUrl: '/posts.html',
      //   controller: 'PostCtrl',
      //   resolve: {
      //     post: ['$stateParams', 'postService', 
      //     function($stateParams, postService) {
      //       return postService.get($stateParams.id);
      //     }]
      //   }
      // });

    $urlRouterProvider.otherwise('home');
}]);