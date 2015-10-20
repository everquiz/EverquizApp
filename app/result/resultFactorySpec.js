describe('ResultFactory', function () {
    var resultFactory, $httpBackend, profileFactory;

    // Set up the module
    beforeEach(module('everquizApp'));

    beforeEach(inject(function (_resultFactory_, _$httpBackend_, _profileFactory_) {
            resultFactory = _resultFactory_;
            $httpBackend = _$httpBackend_;
            profileFactory = _profileFactory_;
            profileFactory.addAchievement = sinon.stub();
        })
    );
    describe('checkResult', function () {
        it('should return result between 0 and 100', function () {
            $httpBackend.expectPUT('/checkresult')
                .respond({
                    result: 0.7
                });
            var result;
            resultFactory.checkResult()
                .then(function (res) {
                    result = res;
                });
            expect(profileFactory.addAchievement).not.to.be.called;
            $httpBackend.flush();
            expect(profileFactory.addAchievement).to.have.been.calledWith('5614d7cd60a7a12614a331b6');
            expect(profileFactory.addAchievement).not.to.have.been.calledWith('5614d7cd60a7a12614a331b5');
            expect(result).to.be.at.least(0);
            expect(result).to.be.at.most(100);
        });

        it('should add achievement if result is 100', function () {
            $httpBackend.expectPUT('/checkresult')
                .respond({
                    result: 1
                });
            resultFactory.checkResult();
            $httpBackend.flush();
            expect(profileFactory.addAchievement).to.have.been.calledWith('5614d7cd60a7a12614a331b5');
        });
    });


    it('should return last result', function () {
        var lastResult = resultFactory.getLastResult();
        expect(lastResult).to.be.null;
    });

    it('should set last result', function () {
        resultFactory.setLastResult(1);
        var lastResult = resultFactory.getLastResult();
        expect(lastResult).to.be.equal(1);
    });
});