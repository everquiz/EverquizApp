(function () {
    'use strict'

    angular
        .module('everquizApp')
        .service('quizService', quizService);

    quizService.$inject = ['$http', 'authFactory', 'categoryService'];

    function quizService($http, authFactory, categoryService) {

        // For admin
        var _quizzes = [];
        this.quizzes = _quizzes;

        // For user
        var self = {};
        self.quizzes = [];

        self.activeQuiz = null;

        /**
         * For user section
         */
        this.getQuizzes = function () {
            return $http.get('/api/v1/Quizzes?populate=category', {
                    headers: {Authorization: 'Bearer ' + authFactory.getToken()}
                })
                .then(function (res) {
                return res.data;
            });
        }

        this.getQuizzesByQuery = function (query) {
            return $http.get('/api/v1/Quizzes?populate=category&' + query, {
                    headers: {Authorization: 'Bearer ' + authFactory.getToken()}
                })
                .then(function (res) {
                return res.data;
            });
        }

        this.getQuestions = function (id) {
            return $http.get('/api/v1/Questions?quiz=' + id + '&populate=answers', {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            })
                .then(function (res) {
                return res.data;
            });
        }

        this.checkResult = function (result) {
            return $http.put('/checkresult', result, {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            })
                .then(function (res) {
                return res.data;
            })
        }

        /**
         * For admin section
         */
        this.getAll = function () {
            $http.get('/api/v1/Quizzes?populate=category&select=category._id,category.title', {
                    headers: {Authorization: 'Bearer ' + authFactory.getToken()}
                })
                .then(function (res) {
                    angular.copy(res.data, self.quizzes);
                });
            return self.quizzes;
        };

        this.getAllTest = function () {
            return $http.get('/api/v1/Quizzes?populate=category&select=category._id,category.title', {
                    headers: {Authorization: 'Bearer ' + authFactory.getToken()}
                })
                .then(function (res) {
                    return res.data;
                });
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
                        self.quizzes.push(data);
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


    }

})();