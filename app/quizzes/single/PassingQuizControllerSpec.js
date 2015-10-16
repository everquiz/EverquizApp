'use strict';

describe('PassingQuizController', function () {
    var PassingQuizCtrl;

    // Set up the module
    beforeEach(module('everquizApp', function ($provide) {
        $provide.value('resultFactory', {
            checkResult: function () {
                return true;
            }
        });
        $provide.value('scrollFactory', {
            scroll: function () {
                return true;
            }
        });
    }));

    beforeEach(inject(function ($controller) {
            PassingQuizCtrl = $controller('PassingQuizController');
        })
    );

    describe('checking result', function () {
        it('should use resultFactory function to send data', function () {
            PassingQuizCtrl.checkResult();
        });
    });
})
;