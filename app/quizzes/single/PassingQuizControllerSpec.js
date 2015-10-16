describe('PassingQuizController', function () {
    var PassingQuizCtrl;

    var resultFactory;
    var scrollFactory;

    // Set up the module
    beforeEach(module('everquizApp', function ($provide) {
        $provide.value('resultFactory', resultFactory = {
            checkResult: sinon.stub()
        });
        $provide.value('scrollFactory', scrollFactory = {
            scroll: sinon.stub()
        });
    }));

    beforeEach(inject(function ($controller) {
            PassingQuizCtrl = $controller('PassingQuizController');
        })
    );

    describe('checking result', function () {
        it('should use resultFactory function to send data', function () {
            PassingQuizCtrl.checkResult();
            resultFactory.checkResult.should.have.been.calledWith(PassingQuizCtrl.quiz);
        });
    });
})
;