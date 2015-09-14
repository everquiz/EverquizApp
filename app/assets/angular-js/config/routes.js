(function() {
  'use strict'

  angular
      .module('everquizApp')
      .config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

          // Handler for Restricting Access to a page using the state.resolve call
          var accessUser = function (authFactory, $state) {
            if (!authFactory.isLoggedIn()) {
              alert('You have to login');
              $state.go('/login');
            }
            ;
          };

          var accessAdmin = function (authFactory, $state) {
            if (!authFactory.isAdmin()) {
              alert('You have to be admin to be here');
              $state.go('/login');
            }
            ;
          };

          $stateProvider
              .state('home', {
                url: '/',
                views: {
                  '': {
                    templateUrl: 'views/home/index.html'
                  },
                  'header@home': {
                    templateUrl: 'views/layouts/_header.html',
                    controller: 'NavController as NavCtrl'
                  },
                  'getStarted@home': {
                    templateUrl: 'views/home/_getStarted.html'
                  },
                  'profile@home': {
                    templateUrl: 'views/home/_profile.html',
                    controller: 'ProfileController as ProfileCtrl'
                  },
                  'quizzes@home': {
                    templateUrl: 'views/home/_quizzes.html',
                    controller: "QuizzesContainerController as QuizzesContainerCtrl"
                  },
                  'list@home': {
                    templateUrl: 'views/home/quizzes/_list.html',
                    controller: 'RunQuizzesController as RunQuizzesCtrl'
                  },
                  'quiz@home': {
                    templateUrl: 'views/home/quizzes/_quiz.html',
                    controller: 'PassingQuizController as PassingQuizCtrl'
                  },
                  'notes@home': {
                    templateUrl: 'views/profile/_notes.html',
                    controller: 'NotesController as NotesCtrl'
                  },
                  'getFail@home': {
                    templateUrl: 'views/home/_getFail.html'
                  },
                  'footer@home': {
                    templateUrl: 'views/layouts/_footer.html'
                  },
                  'addQuiz@home': {
                    templateUrl: 'views/home/_addQuiz.html'
                  }
                }
              })
              .state('admin', {
                url: '/admin',
                templateUrl: 'views/admin/index.html',
                controller: 'AdminController as AdminCtrl',
                resolve: {loginRequired: accessAdmin}
              })
              .state('admin.quizzes', {
                url: '/quizzes',
                templateUrl: 'views/admin/_quizzes.html',
                controller: 'QuizzesController as QuizzesCtrl',
                resolve: {
                  quizzes: ['quizService',
                    function (quizService) {
                      return quizService.getAll();
                    }]
                }
              })
              .state('admin.quiz', {
                url: '/quiz/{id}',
                templateUrl: 'views/admin/_quiz.html',
                controller: 'QuizController as QuizCtrl',
                resolve: {
                  quiz: ['$stateParams', 'quizService',
                    function ($stateParams, quizService) {
                      return quizService.get($stateParams.id);
                    }]
                }
              })
              .state('admin.question', {
                url: '/question/{id}',
                templateUrl: 'views/admin/_question.html',
                controller: 'QuestionController as QuestionCtrl',
                resolve: {
                  question: ['$stateParams', 'questionService',
                    function ($stateParams, questionService) {
                      return questionService.get($stateParams.id);
                    }]
                }
              })
              .state('admin.users', {
                url: '/users',
                templateUrl: 'views/admin/_users.html',
                controller: 'MainController as MainCtrl',
                resolve: {
                  userPromise: ['userService',
                    function (userService) {
                      return userService.getAll();
                    }]
                }
              })
              .state('users', {
                url: '/users',
                templateUrl: 'views/partials/users.html',
                controller: 'MainController as MainCtrl',
                resolve: {
                  userPromise: ['userService',
                    function (userService) {
                      return userService.getAll();
                    }]
                }
              })
              .state('dashboard', {
                url: '/dashboard/{id}',
                templateUrl: 'views/partials/dashboard.html',
                controller: 'UserController as UserCtrl',
                resolve: {
                  user: ['$stateParams', 'userService',
                    function ($stateParams, userService) {
                      return userService.get($stateParams.id);
                    }]
                }
              })
              .state('question', {
                url: '/quiz/{quizId}/question/{id}',
                templateUrl: 'views/partials/question.html',
                controller: 'QuestionController as QuestionCtrl',
                resolve: {
                  question: ['$stateParams', 'questionService',
                    function ($stateParams, questionService) {
                      return questionService.get($stateParams.id);
                    }]
                }
              })
              .state('login', {
                url: '/login',
                templateUrl: 'views/partials/auth/login.html',
                controller: 'AuthController as AuthCtrl'
              })
              .state('register', {
                url: '/register',
                templateUrl: 'views/partials/auth/register.html',
                controller: 'AuthController as AuthCtrl',
                onEnter: ['$state', 'authFactory', function ($state, authFactory) {
                  if (authFactory.isLoggedIn()) {
                    $state.go('home');
                  }
                }]
              })
          $urlRouterProvider.otherwise('/');
        }]);

})();