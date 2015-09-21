(function () {
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
                                templateUrl: 'home/index.html'
                            },
                            'header@home': {
                                templateUrl: 'layouts/_header.html',
                                controller: 'NavController as NavCtrl'
                            },
                            'profile@home': {
                                templateUrl: 'profile/_profile.html',
                                controller: 'ProfileController as ProfileCtrl',
                                resolve: {
                                    profile: ['profileFactory',
                                        function (profileFactory) {
                                            return profileFactory.updateProfile();
                                        }]
                                }
                            },
                            'getStarted@home': {
                                templateUrl: 'home/_getStarted.html'
                            },
                            'video@home': {
                                templateUrl: 'video/_video.html'
                            },
                            'quizzes@home': {
                                templateUrl: 'quizzes/_quizzes.html',
                                controller: "QuizzesContainerController as QuizzesContainerCtrl"
                            },
                            'list@home': {
                                templateUrl: 'quizzes/list/_list.html',
                                controller: 'RunQuizzesController as RunQuizzesCtrl',
                                resolve: {
                                    quizzes: ['quizService',
                                        function (quizService) {
                                            return quizService.getQuizzes();
                                        }],
                                    history: ['historyService',
                                        function (historyService) {
                                            return historyService.getHistory();
                                        }]
                                }
                            },
                            'quiz@home': {
                                templateUrl: 'quizzes/single/_quiz.html',
                                controller: 'PassingQuizController as PassingQuizCtrl'
                            },
                            'notes@home': {
                                templateUrl: 'notes/_notes.html',
                                controller: 'NotesContainerController as NotesContainerCtrl'
                            },
                            'notesList@home': {
                                templateUrl: 'notes/_notes.list.html',
                                controller: 'NotesListController as NotesListCtrl',
                                resolve: {
                                    notes: ['notesService',
                                        function (notesService) {
                                            return notesService.getNotes();
                                        }]
                                }
                            },
                            'notesMain@home': {
                                templateUrl: 'notes/_notes.main.html',
                                controller: 'NotesMainController as NotesMainCtrl',
                                resolve: {
                                    notes: ['notesService',
                                        function (notesService) {
                                            return notesService.getNotes();
                                        }]
                                }
                            },
                            'getFail@home': {
                                templateUrl: 'home/_getFail.html'
                            },
                            'footer@home': {
                                templateUrl: 'layouts/_footer.html'
                            },
                            'addQuiz@home': {
                                templateUrl: 'quizzes/_addQuiz.html'
                            }
                        }
                    })
                    .state('admin', {
                        url: '/admin',
                        templateUrl: 'admin/index.html',
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