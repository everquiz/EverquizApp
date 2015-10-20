describe('RunQuizzesController', function () {
    var RunQuizzesCtrl, quizFactory, categoryService, authFactory, historyService;

    var difficulties = [
        {_id: 0, title: 'Novice'},
        {_id: 1, title: 'Advanced'},
        {_id: 2, title: 'Expert'}
    ];

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

    beforeEach(inject(function ($controller, $q, $rootScope, _authFactory_, _categoryService_, _historyService_, _quizFactory_) {
            var deferredCategories, deferredQuizzes, deferredHistory;
            quizFactory = _quizFactory_;
            categoryService = _categoryService_;
            authFactory = _authFactory_;
            historyService = _historyService_;
            deferredCategories = $q.defer();
            deferredCategories.resolve(categories);
            deferredQuizzes = $q.defer();
            deferredQuizzes.resolve(quizzes);
            deferredHistory = $q.defer();
            deferredHistory.resolve(history);

            authFactory.currentUserId = sinon.stub();
            authFactory.currentUserId.returns(1);

            categoryService.getCategories = sinon.stub();
            categoryService.getCategories.returns(deferredCategories.promise);

            historyService.updateHistory = sinon.stub();
            historyService.updateHistory.returns(deferredHistory.promise);

            quizFactory.getDifficulties = sinon.stub();
            quizFactory.getDifficulties.returns(difficulties);
            quizFactory.getQuizzes = sinon.stub();
            quizFactory.getQuizzes.returns(deferredQuizzes.promise);
            quizFactory.getQuizzesByQuery = sinon.stub();
            quizFactory.getQuizzesByQuery.returns(deferredQuizzes.promise);

            RunQuizzesCtrl = $controller('RunQuizzesController');
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