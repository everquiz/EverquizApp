(function () {
    'use strict';
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
                };

                var accessAdmin = function (authFactory, $state) {
                    if (!authFactory.isAdmin()) {
                        alert('You have to be admin to be here');
                        $state.go('/login');
                    }
                };

                $stateProvider
                    .state('home', {
                        url: '/',
                        views: {
                            '': {
                                templateUrl: 'home/index.html'
                            },
                            'header@home': {
                                templateUrl: 'layouts/_header.html',
                                controller: 'NavController as NavCtrl'
                            },
                            'profile@home': {
                                templateUrl: 'profile/_profile.html',
                                controller: 'ProfileController as ProfileCtrl'
                            },
                            'about@home': {
                                templateUrl: 'about/_about.html',
                                controller: 'AboutController as AboutCtrl'
                            },
                            'video@home': {
                                templateUrl: 'video/_video.html',
                                controller: 'VideoController as VideoCtrl'
                            },
                            'quizzes@home': {
                                templateUrl: 'quizzes/_quizzes.html',
                                controller: "QuizzesContainerController as QuizzesContainerCtrl"
                            },
                            'list@home': {
                                templateUrl: 'quizzes/list/_list.html',
                                controller: 'RunQuizzesController as RunQuizzesCtrl',
                                resolve: {
                                    quizzes: ['quizFactory',
                                        function (quizFactory) {
                                            return quizFactory.getQuizzes();
                                        }]
                                }
                            },
                            'quiz@home': {
                                templateUrl: 'quizzes/single/_quiz.html',
                                controller: 'PassingQuizController as PassingQuizCtrl'
                            },
                            'result@home': {
                                templateUrl: 'result/_result.html',
                                controller: 'ResultController as ResultCtrl'
                            },
                            'notes@home': {
                                templateUrl: 'notes/_notes.html',
                                controller: 'NotesContainerController as NotesContainerCtrl'
                            },
                            'notesList@home': {
                                templateUrl: 'notes/list/_list.html',
                                controller: 'NotesListController as NotesListCtrl'
                            },
                            'notesMain@home': {
                                templateUrl: 'notes/main/_main.html',
                                controller: 'NotesMainController as NotesMainCtrl'
                            },
                            'footer@home': {
                                templateUrl: 'layouts/_footer.html'
                            }
                        }
                    })
                    .state('admin', {
                        url: '/admin',
                        templateUrl: 'admin/index.html',
                        controller: 'NavController as NavCtrl',
                        resolve: {loginRequired: accessAdmin}
                    })
                    .state('admin.categories', {
                        url: '/categories',
                        templateUrl: 'admin/categories/_categories.html',
                        controller: 'CategoriesController as CategoriesCtrl',
                        resolve: {
                            categories: ['categoryService',
                                function (categoryService) {
                                    return categoryService.getAll();
                                }]
                        }
                    })
                    .state('admin.quizzes', {
                        url: '/quizzes',
                        templateUrl: 'admin/quizzes/_quizzes.html',
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
                        templateUrl: 'admin/quiz/_quiz.html',
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
                        templateUrl: 'admin/question/_question.html',
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
                        templateUrl: 'admin/users/_users.html',
                        controller: 'UsersController as UsersCtrl',
                        resolve: {
                            userPromise: ['userService',
                                function (userService) {
                                    return userService.getAll();
                                }]
                        }
                    })
                    .state('login', {
                        url: '/login',
                        templateUrl: 'auth/login.html',
                        controller: 'AuthController as AuthCtrl'
                    })
                    .state('register', {
                        url: '/register',
                        templateUrl: 'auth/register.html',
                        controller: 'AuthController as AuthCtrl',
                        onEnter: ['$state', 'authFactory', function ($state, authFactory) {
                            if (authFactory.isLoggedIn()) {
                                $state.go('home');
                            }
                        }]
                    });
                $urlRouterProvider.otherwise('/');
            }]);

})();