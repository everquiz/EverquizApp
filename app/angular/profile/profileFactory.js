(function () {
    'use strict';

    angular
        .module('everquizApp')
        .factory('profileFactory', profileFactory);

    profileFactory.$inject = ['$http', 'authFactory', 'historyService', 'notesService', '$q'];

    function profileFactory($http, authFactory, historyService, notesService, $q) {
        var profile = {};
        var display = false;

        var service = {
            updateProfile: updateProfile,
            showProfile: showProfile,
            hideProfile: hideProfile,
            toggleProfile: toggleProfile,
            isVisible: isVisible
        };

        return service;

        function updateProfile() {
            var id = authFactory.currentUserId();
            if (id) {
                return $http.get('/api/v1/Users/' + id + '?populate=history').then(function (res) {
                    profile = res.data;

                    var result = getQuizStatistic(profile.history);
                    profile.averageResult = result.averageResult;
                    profile.quizCompleted = result.quizCompleted;
                    getLastActions().then(function (res) {
                        profile.lastActions = res;
                    });
                    console.log(profile);
                    return profile;
                });
            }
        }

        function getQuizStatistic(history) {
            var result = {};
            if (!history.length) {
                result = {
                    averageResult: 0,
                    quizCompleted: 0
                };
                return result;
            }
            var averageResult = 0;
            var quizCompleted = 0;
            for (var i = 0; i < history.length; ++i) {
                averageResult += history[i].result;
                if (history[i].isCompleted) quizCompleted++;
            }

            result = {
                averageResult: Math.round(( averageResult / history.length ) * 100) + '%',
                quizCompleted: history.length
            };

            return result;
        }

        function hideProfile() {
            display = false;
        }

        function showProfile() {
            display = true;
        }

        function isVisible() {
            return display;
        }

        function toggleProfile() {
            display = !display;
        }

        function getLastActions () {
            var id = authFactory.currentUserId();
            return $q.all([
                notesService.getLastThree(), 
                historyService.getLastThree()
                ])
            .then(function(result) {
                var lastActions = [],
                    resultLastActions = [];
                angular.forEach(result, function(response) {
                    lastActions.push(response.data);
                });
                lastActions = lastActions[0].concat(lastActions[1])
                lastActions = lastActions.sortBy('-createdAt');
                angular.forEach(lastActions, function(response) {
                    if (response.quiz) {
                        resultLastActions.push({
                            createdAt: response.createdAt, 
                            title: response.quiz.title,
                            result: Math.round(response.result * 100),
                            type: 'quiz'
                        });
                    } else if (response.title) {
                        resultLastActions.push({
                            createdAt: response.createdAt, 
                            title: response.title,
                            type: 'note'
                        });
                    }
                });
                return resultLastActions.splice(0, 3);
            });
        }
    }
})();

