describe('RunQuizzesController', function () {
    var RunQuizzesCtrl, quizFactory, categoryService;

    var quizzes = [{
        _id: 1,
        questions: []
    }];

    var categories = [{
        _id: 1,
        title: "HTML",
        description: "HTML"
    }];

    var history = [{
        _id: 1,
        user: 2,
        result: 0.8,
        quiz: 1
    }];
    history.getBestResult = sinon.stub();
    history.getBestResult.returns(80);

    // Set up the module
    beforeEach(module('everquizApp'));

    beforeEach(inject(function ($controller, $q, $rootScope) {
            quizFactory = {
                getDifficulties: function () {
                    return [
                        {_id: 0, title: 'Novice'},
                        {_id: 1, title: 'Advanced'},
                        {_id: 2, title: 'Expert'}
                    ]
                },
                getQuizzes: function () {
                    var deferred = $q.defer();
                    deferred.resolve(quizzes);
                    return deferred.promise;
                },
                getQuizzesByQuery: function () {
                    var deferred = $q.defer();
                    deferred.resolve(quizzes);
                    return deferred.promise;
                }
            };

            categoryService = {
                getCategories: function () {
                    var deferred = $q.defer();
                    deferred.resolve(categories);
                    return deferred.promise;
                }
            };

            historyService = {
                updateHistory: function () {
                    var deferred = $q.defer();
                    deferred.resolve(history);
                    return deferred.promise;
                }
            };

            authFactory = {
                currentUserId: function () {
                    return 1;
                }
            };

            RunQuizzesCtrl = $controller('RunQuizzesController', {
                quizFactory: quizFactory,
                categoryService: categoryService,
                historyService: historyService,
                authFactory: authFactory
            });
            $rootScope.$apply();
        })
    );

    describe('controller activation', function () {
        it('should get quizzes and set dataLoaded to true', function () {
            expect(RunQuizzesCtrl.quizzes).to.be.deep.equal(quizzes);
            expect(RunQuizzesCtrl.dataLoaded).to.be.true;
        });

        it('should get categories and add them in categories array', function () {
            expect(RunQuizzesCtrl.categories[1]).to.be.equal(categories[0]);
        });

        it('should get user history if logged in', function () {
            expect(RunQuizzesCtrl.history).to.be.equal(history);
        });
    });

    describe('updateQuizzes while selecting some options', function () {
        it('should get all quizzes', inject(function ($rootScope) {
            RunQuizzesCtrl.updateQuizzes();
            RunQuizzesCtrl.quizzes = [];
            expect(RunQuizzesCtrl.dataLoaded).to.be.false;
            expect(RunQuizzesCtrl.quizzes).to.be.empty;
            $rootScope.$apply();
            expect(RunQuizzesCtrl.dataLoaded).to.be.true;
            expect(RunQuizzesCtrl.quizzes).to.be.deep.equal(quizzes);
        }));

        it('should get passed quizzes', inject(function ($rootScope) {
            RunQuizzesCtrl.updateQuizzes();
            RunQuizzesCtrl.quizzes = [];
            RunQuizzesCtrl.selectedStatus = 0;
            expect(RunQuizzesCtrl.dataLoaded).to.be.false;
            expect(RunQuizzesCtrl.quizzes).to.be.empty;
            $rootScope.$apply();
            expect(RunQuizzesCtrl.dataLoaded).to.be.true;
            expect(RunQuizzesCtrl.quizzes).to.be.deep.equal(quizzes);
        }));

        it('should get failed quizzes', inject(function ($rootScope) {
            RunQuizzesCtrl.updateQuizzes();
            RunQuizzesCtrl.quizzes = [];
            RunQuizzesCtrl.selectedStatus = 1;
            expect(RunQuizzesCtrl.dataLoaded).to.be.false;
            expect(RunQuizzesCtrl.quizzes).to.be.empty;
            $rootScope.$apply();
            expect(RunQuizzesCtrl.dataLoaded).to.be.true;
            expect(RunQuizzesCtrl.quizzes).to.be.empty;
        }));
    });
});