'use strict';

describe('Note Service', function() {
    var notesService;
    var $httpBackend;

    var response = [
        {
            id: 1,
            title: 'title 1',
            text: 'text 1',
            tag: 'tag 1',
            user: 1
        },
        {
            id: 2,
            title: 'title 2',
            text: 'text 2',
            tag: 'tag 2',
            user: 1
        },
        {
            id: 3,
            title: 'title 3',
            text: 'text 3',
            tag: 'tag 3',
            user: 1
        }];

    beforeEach(function () {
        module('everquizApp');

        inject(function ($injector) {
            notesService = $injector.get('notesService');

            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.when('GET', '/api/v1/Notes?user=1').respond(response);
        });
    });

    //afterEach(function () {
    //    $httpBackend.flush();
    //    $httpBackend.verifyNoOutstandingExpectation();
    //    $httpBackend.verifyNoOutstandingRequest();
    //});

    it('should add note', function() {

    });

    it('should get notes', function() {
        $httpBackend.expectGET('/api/v1/Notes?user=1');
    });

    it('should delete note', function() {

    });
})