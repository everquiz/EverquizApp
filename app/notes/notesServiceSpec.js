'use strict';

describe("NotesService", function() {
    var notesService, $httpBackend, notes, url, regex;

    // Set up the module
    beforeEach(module('everquizApp'));

    beforeEach(inject(function (_notesService_, _$httpBackend_) {
        notesService = _notesService_;
        $httpBackend = _$httpBackend_;
        notes = [
            {
                _id: 1,
                title: 'Note 1',
                text: 'Text 1',
                tag: 'Tag 1'
            },
            {
                _id: 2,
                title: 'Note 2',
                text: 'Text 2',
                tag: 'Tag 3'
            },
            {
                _id: 3,
                title: 'Note 3',
                text: 'Text 3',
                tag: 'Tag 3'
            }
        ];
        url = '/api/v1/Notes';
        regex = new RegExp(url + '/([0-9]+)');
    }));

    it('should get notes from the server', function () {

        $httpBackend.whenGET(url + '?user=id').respond({
            data: notes
        });
        var notesAll = [];
        notesService.getAll()
            .then(function (res) {
                notesAll = res.data;
            });

        expect(notesAll).to.be.empty;
        expect(notesAll).to.be.instanceof(Array);
        expect(notesAll).to.have.length(0);

        $httpBackend.flush();

        expect(notesAll).not.to.be.empty;
        expect(notesAll).to.be.instanceof(Array);
        expect(notesAll).to.have.length(3);
        expect(notesAll).deep.equal(notes);
    });

    it('should post notes to the server', function () {
        $httpBackend.whenPOST(url).respond(function (method, url, data) {
            notes.push(angular.fromJson(data));
            return [200, {}, {}];
        });
        expect(notes).not.to.be.empty;
        expect(notes).to.be.instanceof(Array);
        expect(notes).to.have.length(3);

        notesService.create({title: 'Note new', text: 'Text new', tag: 'Tag new'});

        $httpBackend.flush();

        expect(notes).not.to.be.empty;
        expect(notes).to.have.length(4);
        expect(notes).to.deep.include.members([
            {title: 'Note new', text: 'Text new', tag: 'Tag new'}]);
    });

    it('should get notes from the server', function () {
        var regex = new RegExp(url + '/([0-9]+)');
        var note;
        $httpBackend.whenGET(regex.test('/api/v1/Notes')).respond(function (method, url, data) {
            notes.forEach(function(element, index) {
                if(element._id === +url.match(regex)[1]) {
                    note = element;
                    return [200, element, {}];
                }
            });
            return [404, 'Not found', {}];
        });

        notesService.get('1');

        $httpBackend.flush();

        expect(notes).not.to.be.empty;
        expect(notes).to.be.instanceof(Object);
        expect(notes).deep.equal(achievements[0]);
        expect(notes).not.deep.equal(
            {title: 'Note new', text: 'Text new', tag: 'Tag new'});
    });

    it('should delete note from server', function () {
        var note;
        $httpBackend.whenDELETE(regex.test(url)).respond(function (method,url,data) {
            notes.forEach(function(element, index) {
                if(element._id === +url.match(regex)[1]) {
                    notes.splice(index, 1);
                    note = element;
                    return [200, element, {}];
                }
            });
            return [404, 'Not found', {}];
        });
        notesService.remove(notes[1]);

        $httpBackend.flush();

        expect(notes).not.to.be.empty;
        expect(notes).to.have.length(2);
        expect(notes).to.deep.include.members([
            {_id: 1, title: 'Note 1', text: 'Text 1', tag: 'Tag 1'},
            {_id: 3, title: 'Note 3', text: 'Text 3', tag: 'Tag 3'}]);
        expect(notes).deep.equal({_id: 2, title: 'Note 2', text: 'Text 2', tag: 'Tag 3'});
    });

    it('should update note from server', function () {
        var note,
            noteToUpdate = {
                _id: 2,
                title: 'Note 2',
                text: 'Text 2',
                tag: 'Tag 3'
            };
        $httpBackend.whenPUT(regex.test(url)).respond(function (method,url,data) {
            notes.forEach(function(element, index) {
                if(element._id === +url.match(regex)[1]) {
                    notes[index] = data;
                    note = element;
                    return [200, element, {}];
                }
            });
            return [404, 'Not found', {}];
        })
        notesService.update(noteToUpdate);

        $httpBackend.flush();
        expect(notes[1]).not.deep.equal(note);
        expect(angular.fromJson(notes[1])).deep.equal(noteToUpdate);
    });
});