;(function() {
    'use strict';

    describe('AboutController', function() {

        describe.only('AboutController logic', function() {

            var $httpBackend,
                scrollFactory,
                ctrl;

            // Set up the module
            beforeEach(module('everquizApp', function ($provide) {
                $provide.value('scrollFactory', {
                    scroll: sinon.stub()
                });
            }));

            beforeEach(inject(function (_$httpBackend_, $controller, _scrollFactory_) {

                scrollFactory = _scrollFactory_;

                ctrl = $controller('AboutController', {
                    scrollFactory: scrollFactory,
                });
            }));

            it('should go to element', function () {
                ctrl.goToElement('elementId');
                expect(scrollFactory.scroll).to.have.been.calledWith('elementId');

            });
        })
    })
})();