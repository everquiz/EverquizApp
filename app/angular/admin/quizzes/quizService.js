(function () {
    'use strict';

    angular
        .module('everquizApp')
        .service('quizService', quizService);

    quizService.$inject = ['$http', 'authFactory', 'categoryService'];

    function quizService($http, authFactory, categoryService) {

        // For admin
        var _quizzes = [];
        this.quizzes = _quizzes;

        // For user
        var vm = this;
        vm.lastResult = null;
        vm.quizzes = [];

        vm.activeQuiz = null;
        vm.difficulties = [
            {_id: 0, title: 'Novice'},
            {_id: 1, title: 'Advanced'},
            {_id: 2, title: 'Expert'}
        ];

        /**
         * For user section
         */

        this.getQuizzes = function () {
            return $http.get('/api/v1/Quizzes?populate=category&status=1', {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            })
                .then(function (res) {
                    return res.data;
                });
        };

        this.getQuizzesByQuery = function (query) {
            return $http.get('/api/v1/Quizzes?populate=category&status=1&' + query, {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            })
                .then(function (res) {
                    return res.data;

                });
        };

        this.getQuestions = function (id) {
            return $http.get('/api/v1/Questions?quiz=' + id + '&populate=answers', {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            })
                .then(function (res) {
                    return res.data;
                });
        };

        this.checkResult = function (result) {
            return $http.put('/checkresult', result, {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            })
                .then(function (res) {
                    vm.lastResult = Math.round(res.data.result * 100);
                    return res.data;
                })
        };

        /**
         * For admin section
         */
        this.getAll = function () {
            $http.get('/api/v1/Quizzes?populate=category&select=category._id,category.title', {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            })
                .then(function (res) {
                    angular.copy(res.data, vm.quizzes);
                });
            return vm.quizzes;
        };

        this.get = function (id) {
            return $http.get('/api/v1/Quizzes/' + id + '?populate=questions', {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            })
                .then(function (res) {
                    return res.data;
                });
        };

        this.create = function (quiz) {
            return $http.post('/api/v1/Quizzes', quiz, {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            }).success(function (data) {
                console.log(data);
                categoryService.get(data.category).then(function (res) {
                    console.log(res);
                    data.category = res;
                    console.log(data);
                    vm.quizzes.push(data);
                });

            });
        };

        this.unactive = function (quiz) {
            quiz.status = 0;
            return $http.put('/api/v1/Quizzes/' + quiz._id, quiz, {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            });
        };

        this.active = function (quiz) {
            quiz.status = 1;
            return $http.put('/api/v1/Quizzes/' + quiz._id, quiz, {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            });
        };

        this.update = function (quiz) {
            return $http.put('/api/v1/Quizzes/' + quiz._id, quiz, {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            });
        };

        this.getDifficulties = function () {
            return vm.difficulties;
        };

        this.getComplexity = function (complexity) {
            for (var i = vm.difficulties.length - 1; i >= 0; i--) {
                if (vm.difficulties[i]._id === complexity) {
                    return vm.difficulties[i].title;
                }
            }
        }
    }
})();