(function () {
    'use strict';

    angular
        .module('everquizApp')
        .factory('profileFactory', profileFactory);

    profileFactory.$inject = ['$http', 'authFactory', '$q', 'achievementService', 'alertify'];

    function profileFactory($http, authFactory, $q, achievementService, alertify) {
        var profile = {};
        var display = false;
        var observerCallbacks = [];

        var factory = {
            profile: profile,
            registerObserverCallback: registerObserverCallback,
            notifyObservers: notifyObservers,
            getProfile: getProfile,
            updateProfile: updateProfile,
            showProfile: showProfile,
            hideProfile: hideProfile,
            toggleProfile: toggleProfile,
            isVisible: isVisible,
            addAchievement: addAchievement,
            getQuizStatistic: getQuizStatistic,
            getLastThreeNotes: getLastThreeNotes,
            getLastThreeHistory: getLastThreeHistory,
            getLastActions: getLastActions
        };

        return factory;


        function registerObserverCallback(callback) {
            observerCallbacks.push(callback);
        }

        function notifyObservers() {
            angular.forEach(observerCallbacks, function (callback) {
                callback();
            });
        }


        function getProfile() {
            return profile;
        }

        function updateProfile() {
            var id = authFactory.currentUserId();
            if (id) {
                return $http.get('/api/v1/Users/' + id + '?populate=history,achievements')
                    .then(function (res) {
                        console.log(res.data);
                        profile = res.data;
                        var result = getQuizStatistic(profile.history);
                        profile.averageResult = result.averageResult;
                        profile.quizCompleted = result.quizCompleted;
                        getLastActions()
                            .then(function (res) {
                                profile.lastActions = res;
                            });
                        notifyObservers();
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

        function getLastThreeNotes() {
            var id = authFactory.currentUserId();
            if (id) {
                return $http.get('/api/v1/Notes?user=' + id + '&sort=-createdAt&limit=3');
            }
        }

        function getLastThreeHistory() {
            var id = authFactory.currentUserId();
            if (id) {
                return $http.get('/api/v1/Histories?populate=quiz&user=' + id + '&sort=-createdAt&limit=3');
            }
        }

        function getLastActions() {
            return $q.all([
                getLastThreeNotes(),
                getLastThreeHistory()
            ])
                .then(function (result) {
                    var lastActions = [],
                        resultLastActions = [];
                    angular.forEach(result, function (response) {
                        lastActions.push(response.data);
                    });
                        lastActions = lastActions[0].concat(lastActions[1]);
                        lastActions = lastActions.sort(function(a, b) {
                            var a_value = new Date(a.createdAt);
                            var b_value = new Date(b.createdAt);
                            return parseFloat(b_value.getTime()) - parseFloat(a_value.getTime());
                        });
                    angular.forEach(lastActions, function (response) {
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

        function addAchievement(achievementId) {
            achievementService.get(achievementId);
            if (profile.achievements) {
                for (var i = profile.achievements.length - 1; i >= 0; i--) {
                    if (profile.achievements[i]._id === achievementId) {
                        // alertify.error("You already have this achievement");
                        return;
                    }
                }
            }
            var id = authFactory.currentUserId();
            if (id) {
                $http.get('/api/v1/Users/' + id)
                    .then(function (res) {
                        var user = res.data;
                        user.achievements.push(achievementId);
                        $http.post('/api/v1/Users/' + id, user)
                            .then(function (res) {
                                alertify.success("You received new achievement");
                                updateProfile();
                            })
                    });
            }
        }
    }
})();

