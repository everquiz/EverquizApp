(function () {
    'use strict';

    angular
        .module('everquizApp')
        .service('quizService', quizService);

    quizService.$inject = ['$http', 'authFactory', 'profileFactory', 'categoryService'];

    function quizService($http, authFactory, profileFactory, categoryService) {

        var vm = this;
        vm.lastResult = null;
        vm.quizzes = [];
        vm.activeQuiz = null;

        vm.checkResult = checkResult;
        vm.get = get;
        vm.getQuizzes = getQuizzes;
        vm.getQuizzesByQuery = getQuizzesByQuery;
        vm.getQuestions = getQuestions;
        vm.getAll = getAll;
        vm.create = create;
        vm.unactive = unactive;
        vm.active = active;
        vm.update = update;
        vm.getDifficulties = getDifficulties;
        vm.getComplexity = getComplexity;

        vm.difficulties = [
            {_id: 0, title: 'Novice'},
            {_id: 1, title: 'Advanced'},
            {_id: 2, title: 'Expert'}
        ];

        /**
         * For user section
         */

        function getQuizzes() {
            return $http.get('/api/v1/Quizzes?populate=category&status=1', {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            })
                .then(function (res) {
                    return res.data;
                });
        }

        function getQuizzesByQuery(query) {
            return $http.get('/api/v1/Quizzes?populate=category&status=1' + query, {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            })
                .then(function (res) {
                    return res.data;

                });
        }

        function getQuestions(id) {
            return $http.get('/api/v1/Questions?quiz=' + id + '&populate=answers', {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            })
                .then(function (res) {
                    return res.data;
                });
        }

        function checkResult(result) {
            return $http.put('/checkresult', result, {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            })
                .then(function (res) {
                    vm.lastResult = Math.round(res.data.result * 100);
                    profileFactory.updateProfile();
                    return res.data;
                })
        }

        /**
         * For admin section
         */
        function getAll() {
            $http.get('/api/v1/Quizzes?populate=category&select=category._id,category.title', {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            })
                .then(function (res) {
                    angular.copy(res.data, vm.quizzes);
                });
            return vm.quizzes;
        }

        function get(id) {
            return $http.get('/api/v1/Quizzes/' + id + '?populate=questions', {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            })
                .then(function (res) {
                    return res.data;
                });
        }

        function create(quiz) {
            return $http.post('/api/v1/Quizzes', quiz, {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            }).success(function (data) {
                categoryService.get(data.category).then(function (res) {
                    data.category = res;
                    vm.quizzes.push(data);
                });

            });
        }

        function unactive(quiz) {
            quiz.status = 0;
            return $http.put('/api/v1/Quizzes/' + quiz._id, quiz, {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            });
        }

        function active(quiz) {
            quiz.status = 1;
            return $http.put('/api/v1/Quizzes/' + quiz._id, quiz, {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            });
        }

        function update(quiz) {
            return $http.put('/api/v1/Quizzes/' + quiz._id, quiz, {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            });
        }

        function getDifficulties() {
            return vm.difficulties;
        }

        function getComplexity(complexity) {
            for (var i = vm.difficulties.length - 1; i >= 0; i--) {
                if (vm.difficulties[i]._id === complexity) {
                    return vm.difficulties[i].title;
                }
            }
        }
    }
})();