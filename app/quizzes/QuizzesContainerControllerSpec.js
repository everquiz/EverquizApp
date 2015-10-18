describe('QuizzesContainerController', function () {
    var QuizzesContainerCtrl, quizFactory;

    // Set up the module
    beforeEach(module('everquizApp'));

    beforeEach(inject(function ($controller, $window) {
            quizFactory = {
                setSlider: sinon.stub()
            };
            QuizzesContainerCtrl = $controller('QuizzesContainerController', {quizFactory: quizFactory});

            $window.localStorage.setItem('quiz', JSON.stringify({_id: 1}));
            $window.localStorage.setItem('slide', JSON.stringify({_id: 2}));
        })
    );

    it('should set quizFactory and resultFactory at loading', function () {
        expect(QuizzesContainerCtrl.quizFactory).not.to.be.undefined;
        expect(QuizzesContainerCtrl.resultFactory).not.to.be.undefined;
    });

    it('should set activeQuiz and slide from localStorage', function () {
        expect(quizFactory.activeQuiz).to.be.equal(1);
        expect(quizFactory.setSlider).to.have.been.calledWith({_id: 2});
    });
});