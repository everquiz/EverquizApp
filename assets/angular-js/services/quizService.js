app.service('quizService', function ($http) {

    // For admin
    var _quizzes = [];
    this.quizzes = _quizzes;

    // For user
    var _self = {};
    _self.quizzes = [];

    _self.activeQuiz = null;

    /**
     * For user section
     */
    this.getQuizzes = function () {
        $http.get('/api/v1/Quizzes?populate=category').then(function (res) {
            angular.copy(res.data, _self.quizzes);
        });
        return _self.quizzes;
    }

    this.getQuizzesByCategory = function (category) {
        $http.get('/api/v1/Quizzes?populate=category&category=' + category).then(function (res) {
            angular.copy(res.data, _self.quizzes);
        });
        return _self.quizzes;
    }

    this.getAnswers = function (id) {
        return $http.get('/api/v1/Questions?quiz=' + id + '&populate=answers').then(function (res) {
            return res.data;
        });
    }

    this.checkResult = function (result) {
        return $http.put('/checkresult', result).then(function (res) {
            return res.data;
        })
    }

    /**
     * For admin section
     */
    this.getAll = function () {
        return $http.get('/api/v1/Quizzes?populate=category').then(function (res) {
            angular.copy(res.data, _quizzes);
            return res.data;
        });
    };

    this.get = function (id) {
        return $http.get('/api/v1/Quizzes/' + id + '?populate=questions')
            .then(function (res) {
                return res.data;
            });
    };

    this.create = function (quiz) {
        console.log('quiz');
        console.log(quiz);
        return $http.post('/api/v1/Quizzes', quiz).success(function (data) {
            _quizzes.push(data);
        });
    };

    this.unactive = function (quiz) {
        quiz.status = 0;
        return $http.put('/api/v1/Quizzes/' + quiz._id, quiz);
    };

    this.active = function (quiz) {
        quiz.status = 1;
        return $http.put('/api/v1/Quizzes/' + quiz._id, quiz);
    };

    this.update = function (quiz) {
        return $http.put('/api/v1/Quizzes/' + quiz._id, quiz);
    };
});