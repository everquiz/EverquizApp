describe('historyService', function () {
    var historyService, $httpBackend, authFactory, resultHistory;

    var history = [
        {
            _id: 1,
            user: 1,
            result: 0,
            quiz: 3
        },
        {
            _id: 3,
            user: 1,
            result: 0.8,
            quiz: 3
        },
        {
            _id: 4,
            user: 1,
            result: 0.9,
            quiz: 3
        }];
    // Set up the module
    beforeEach(module('everquizApp'));

    beforeEach(inject(function (_historyService_) {
            historyService = _historyService_;
        })
    );

    describe('history updating', function () {
        beforeEach(inject(function (_authFactory_, _$httpBackend_) {
                authFactory = _authFactory_;
                $httpBackend = _$httpBackend_;
                authFactory.currentUserId = sinon.stub();
                authFactory.currentUserId.returns(1);

                $httpBackend.whenGET('/api/v1/Histories?user=1')
                    .respond(history);
            })
        );

        it('should ask server for histories for current user', function () {
            resultHistory = historyService.getHistory();
            expect(resultHistory).to.be.empty;
            historyService.updateHistory();
            $httpBackend.flush();
            resultHistory = historyService.getHistory();
            expect(resultHistory).not.to.be.empty;
        });

        it('should add methods to history array', function () {
            historyService.updateHistory();
            $httpBackend.flush();
            resultHistory = historyService.getHistory();
            expect(resultHistory).to.have.ownProperty('getAverageResult');
            expect(resultHistory).to.have.ownProperty('getAverageResultProgression');
            expect(resultHistory).to.have.ownProperty('getBestResult');
            expect(resultHistory).to.have.ownProperty('getTotalPassing');
        });

        describe('history methods', function () {
            it('should count avg result', function () {
                var avg = resultHistory.getAverageResult({_id:3});
                expect(avg).to.be.equal(57);
            });

            it('should count avg result progression', function () {
                var avgProgression = resultHistory.getAverageResultProgression({_id:3});
                expect(avgProgression).to.be.deep.equal([0, 40, 57]);
            });

            it('should count best result', function () {
                var best = resultHistory.getBestResult({_id:3});
                expect(best).to.be.equal(90);
            });

            it('should count passing attempts', function () {
                var best = resultHistory.getTotalPassing({_id:3});
                expect(best).to.be.equal(3);
            });
        });
    });

    it('should return history object', function () {
        resultHistory = historyService.getHistory();
        expect(resultHistory).to.be.empty;
    });
});