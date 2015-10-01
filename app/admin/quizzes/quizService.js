(function () {
    'use strict';

    angular
        .module('everquizApp')
        .service('quizService', quizService);

    quizService.$inject = ['$http', 'authFactory', 'categoryService'];

    function quizService($http, authFactory, categoryService) {

        var self = this;
        self.quizzes = [];
        self.get = get;
        self.getAll = getAll;
        self.create = create;
        self.unactive = unactive;
        self.active = active;
        self.update = update;
        self.getDifficulties = getDifficulties;
        self.getComplexity = getComplexity;
        self.difficulties = [
                {_id: 0, title: 'Novice'},
                {_id: 1, title: 'Advanced'},
                {_id: 2, title: 'Expert'}
            ];

        function getAll() {
            $http.get('/api/v1/Quizzes?populate=category&select=category._id,category.title', {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            })
                .then(function (res) {
                    angular.copy(res.data, self.quizzes);
                });
            return self.quizzes;
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
                    self.quizzes.push(data);
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
            return self.difficulties;
        }

        function getComplexity(complexity) {
            for (var i = self.difficulties.length - 1; i >= 0; i--) {
                if (self.difficulties[i]._id === complexity) {
                    return self.difficulties[i].title;
                }
            }
        }
    }
})();