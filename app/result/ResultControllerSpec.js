describe('ResultController', function () {
    var ResultCtrl, scrollFactory;

    // Set up the module
    beforeEach(module('everquizApp'));

    beforeEach(inject(function ($controller, _scrollFactory_) {
            scrollFactory = _scrollFactory_;
            scrollFactory.scroll = sinon.stub();
            ResultCtrl = $controller('ResultController');

        })
    );

    it('should use scrollFactory scroll function', function () {
        expect(scrollFactory.scroll).not.to.be.called;
        ResultCtrl.goToElement(1);
        expect(scrollFactory.scroll).to.have.been.calledWith(1);
    });
});