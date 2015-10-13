'use strict';

describe('ResultFactory', function () {
    var resultFactory, $httpBackend;

    // Set up the module
    beforeEach(module('everquizApp'));

    beforeEach(function () {
        inject(function (_resultFactory_, _$httpBackend_) {
            resultFactory = _resultFactory_;
            $httpBackend = _$httpBackend_;

            $httpBackend.whenPUT('/checkresult')
                .respond({
                    result: 0.7
                });
            $httpBackend.whenGET('/api/v1/Achievements/5614d7cd60a7a12614a331b6')
                .respond({
                    status: 200
                });
        })
    });

    it('should return result between 0 and 100', function () {
        var result;
        resultFactory.checkResult()
            .then(function (res) {
                result = res;
            });

        $httpBackend.flush();
        expect(result).to.be.at.least(0);
        expect(result).to.be.at.most(100);
    });
});