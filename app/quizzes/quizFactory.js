(function () {
    'use strict';

    angular
        .module('everquizApp')
        .factory('quizFactory', quizFactory);

    quizFactory.$inject = ['$http', 'authFactory', '$window'];

    function quizFactory($http, authFactory, $window) {
        var difficulties = [
            {_id: 0, title: 'Novice'},
            {_id: 1, title: 'Advanced'},
            {_id: 2, title: 'Expert'}
        ];

        var factory = {
            getDifficulties: getDifficulties,
            getComplexity: getComplexity,
            getQuizzes: getQuizzes,
            getQuizzesByQuery: getQuizzesByQuery,
            get: get,
            getQuestions: getQuestions,
            activeQuiz: null,
            questionCount: 0,
            buttonText: 'START QUIZ!',
            startQuiz: false,
            margin: 0,
            resetSlider: resetSlider,
            setSlider: setSlider,
            slide: slide
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

        function resetSlider() {
            factory.activeQuiz = null;
            factory.questionCount = 0;
            factory.buttonText = 'START QUIZ!';
            factory.startQuiz = false;
            factory.margin = 0;
            $window.localStorage.removeItem('quiz');
            $window.localStorage.removeItem('slide');
        }

        function setSlider(slide) {
            factory.questionCount = slide.questionCount;
            factory.buttonText = slide.buttonText;
            factory.startQuiz = slide.startQuiz;
            factory.margin = slide.margin;
        }

        function slide() {
            factory.questionCount = factory.questionCount + 1;
            factory.buttonText = 'NEXT STEP';
            factory.startQuiz = true;
            factory.margin = factory.margin - 1360;
        }
    }
})();