'use strict';

describe('Chart Service', function() {
    var chartService;
    var $httpBackend;
    var historyService;
    var response;

    beforeEach(module('everquizApp', function ($provide) {
        $provide.value('historyService', {
                getHistory: function () {
                    var history = [{
                        _id: 1,
                        createdAt: new Date("21 May 1958 10:12"),
                        result: 0.9},
                        {
                            _id: 2,
                            createdAt: new Date("21 May 1958 10:12"),
                            result: 0.9}
                    ];
                    history.getAverageResult = function () {
                        };
                    history.getAverageResultProgression = function () {
                            return [0.3, 0.4, 0.5]
                        };
                    history.getBestResult = function () {
                        };
                    history.getTotalPassing = function () {
                        };
                    return history;
                }
                }
        );
    }));

    beforeEach(inject(function (_chartService_, _historyService_, _$httpBackend_) {
        historyService = _historyService_;
        chartService = _chartService_;
        $httpBackend = _$httpBackend_;
        response = [];
    }));

    it('should count on average day case', function() {
            var date_start = new Date("20 May 1958 10:12");
            var date_end = new Date("22 May 1958 10:12");

            expect(chartService.average_day).to.not.be.undefined;

            var data = [[]];
            var labels = ['1958/5/21', '1958/5/21'];
            data[0] = historyService.getHistory().getAverageResultProgression();

            expect(chartService.average_day(date_start, date_end)).deep.equal({
                labels: labels,
                series: ["Average result progression"],
                data: data,
                colours: ['#FD2828']
            });
        }
    );

    it('should count on quiz day case', function() {
            var date_start = new Date("20 May 1958 10:12");
            var date_end = new Date("22 May 1958 10:12");

            expect(chartService.quiz_day).to.not.be.undefined;

            var data = [[2]];
            var labels = [];
            labels[0] = '1958/5/21';


            expect(chartService.quiz_day(date_start, date_end)).deep.equal({
                labels: labels,
                series: ["Number of quizzes per date"],
                data: data,
                colours: ['#FD2828']
            });
        }
    );

    it('should count on succesful quiz day case', function() {
            var date_start = new Date("20 May 1958 10:12");
            var date_end = new Date("22 May 1958 10:12");

            expect(chartService.quiz_succesful_day).to.not.be.undefined;

            var data = [[2]];
            var labels = [];
            labels[0] = '1958/5/21';

            console.log(data);

            expect(chartService.quiz_succesful_day(date_start, date_end)).deep.equal({
                labels: labels,
                series: ["Number of succesful quizzes per date"],
                data: data,
                colours: ['#FD2828']
            });
        }
    );

    it('should be able to init date', function() {
            expect(chartService.initDate).to.not.be.undefined;
        }
    );
})
