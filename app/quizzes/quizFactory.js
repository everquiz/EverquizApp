(function () {
    'use strict';

    angular
        .module('everquizApp')
        .factory('quizFactory', quizFactory);

    quizFactory.$inject = ['$http', 'authFactory'];

    function quizFactory($http, authFactory) {

        var display = !!authFactory.currentUserId();
        var difficulties = [
            {_id: 0, title: 'Novice'},
            {_id: 1, title: 'Advanced'},
            {_id: 2, title: 'Expert'}
        ];

        var factory = {
            isVisible: isVisible,
            showQuizzes: showQuizzes,
            hideQuizzes: hideQuizzes,
            activeQuiz: null,
            getDifficulties: getDifficulties,
            getComplexity: getComplexity,
            getQuizzes: getQuizzes,
            getQuizzesByQuery: getQuizzesByQuery,
            questionCount: 0,
            buttonText: 'START QUIZ!',
            startQuiz: false,
            margin: 0,
            get: get,
            getQuestions: getQuestions
        };

        return factory;

        function getDifficulties() {
            return difficulties;
        }

        function getComplexity(complexity) {
            for (var i = difficulties.length - 1; i >= 0; i--) {
                if (difficulties[i]._id === complexity) {
                    return difficulties[i].title;
                }
            }
        }

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

        function get(id) {
            return $http.get('/api/v1/Quizzes/' + id + '?populate=questions', {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            })
                .then(function (res) {
                    return res.data;
                });
        }

        function getQuestions(id) {
            return $http.get('/api/v1/Questions?quiz=' + id + '&populate=answers' + '&select=answers.text,text,quiz', {
                headers: {Authorization: 'Bearer ' + authFactory.getToken()}
            })
                .then(function (res) {
                    return res.data;
                });
        }

        function isVisible() {
            return display;
        }

        function showQuizzes() {
            display = true;
        }

        function hideQuizzes() {
            display = false;
        }
    }
})();