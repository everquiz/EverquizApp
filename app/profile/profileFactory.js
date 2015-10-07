(function () {
    'use strict';

    angular
        .module('everquizApp')
        .factory('profileFactory', profileFactory);

    profileFactory.$inject = ['$http', 'authFactory', '$q', 'achievementService'];

    function profileFactory($http, authFactory, $q, achievementService) {
        var profile = {};
        var display = false;
        var observerCallbacks = [];

        var factory = {
            registerObserverCallback: registerObserverCallback,
            notifyObservers: notifyObservers,
            getProfile: getProfile,
            updateProfile: updateProfile,
            showProfile: showProfile,
            hideProfile: hideProfile,
            toggleProfile: toggleProfile,
            isVisible: isVisible,
            noteAchievement: noteAchievement
        };

        return factory;


        function registerObserverCallback(callback){
            observerCallbacks.push(callback);
        }

        //call this when you know 'foo' has been changed
        function notifyObservers(){
            angular.forEach(observerCallbacks, function(callback){
                callback();
            });
        }


        function getProfile() {
            return profile;
        }

        function updateProfile() {
            var id = authFactory.currentUserId();
            if (id) {
                return $http.get('/api/v1/Users/' + id + '?populate=history,achievements').then(function (res) {
                    profile = res.data;

                    var result = getQuizStatistic(profile.history);
                    profile.averageResult = result.averageResult;
                    profile.quizCompleted = result.quizCompleted;
                    getLastActions().then(function (res) {
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

        function getLastActions () {
            return $q.all([
                getLastThreeNotes(),
                getLastThreeHistory()
                ])
            .then(function(result) {
                var lastActions = [],
                    resultLastActions = [];
                angular.forEach(result, function(response) {
                    lastActions.push(response.data);
                });
                lastActions = lastActions[0].concat(lastActions[1]);
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

        function noteAchievement () {
            achievementService.get('5614d7cd60a7a12614a331b7');
            for (var i = profile.achievements.length - 1; i >= 0; i--) {
                if (profile.achievements[i]._id === '5614d7cd60a7a12614a331b7') {
                    console.log('already achieved!');
                    return;
                }
            }
            var id = authFactory.currentUserId();
            if (id) {
                $http.get('/api/v1/Users/' + id).then(function (res) {
                    var user = res.data;
                    user.achievements.push('5614d7cd60a7a12614a331b7');
                    $http.post('/api/v1/Users/' + id, user).then(function (res) {
                        // alertify.success("You received new achievement");
                    })
                });
            }
        }
    }
})();

