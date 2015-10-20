'use strict';

describe('Note Service', function() {
    var notesService;
    var $httpBackend;
    var authFactory;
    var profileFactory;
    var response;

    beforeEach(module('everquizApp', function ($provide) {
        $provide.value('authFactory', {
                currentUserId: function () {
                    return 1;
                },
                isLoggedIn: function () {
                    return true;
                }
            }
        );
        $provide.value('profileFactory', {
                addAchievement: function (index) {
                    return true;
                },
                updateProfile: function () {
                    return true;
                }
            }
        );
    }));

    beforeEach(inject(function (_notesService_, _authFactory_, _$httpBackend_, _profileFactory_) {
        notesService = _notesService_;
        $httpBackend = _$httpBackend_;
        authFactory = _authFactory_;
        profileFactory = _profileFactory_;
        response = [
            {
                _id: 1,
                title: 'Note 1',
                text: 'Text 1',
                tag: 'Tag 1',
                user: 1
            },
            {
                _id: 2,
                title: 'Note 2',
                text: 'Text 2',
                tag: 'Tag 2',
                user: 1
            },
            {
                _id: 3,
                title: 'Note 3',
                text: 'Text 3',
                tag: 'Tag 3',
                user: 1
            }
        ];
    }));


    it('should add note', function() {
            var notes = [];
            var newNote = {title: 'Note new', text: 'Text new', tag: 'Tag new', user: 1};
            $httpBackend.when('POST', '/api/v1/Notes/' ,newNote).respond(function(method, url, data, headers){
                notes.push(angular.fromJson(data));
                return [200, {}, {}];
            });
            notesService.addNote(newNote);

            $httpBackend.flush();

            expect(notesService.notes).not.to.be.empty;
            expect(notes).not.to.be.empty;
            expect(notes).to.be.instanceof(Array);
            expect(notes).to.have.length(1);
        }
    );

    it('should get notes', function() {
        $httpBackend.when('GET', '/api/v1/Notes?user=1').respond({data: response});

        var notes = [];
        notesService.getNotes().then(function(res) {
            notes = res.data;
        });

        expect(notes).to.be.empty;
        expect(notes).to.be.instanceof(Array);
        expect(notes).to.have.length(0);

        $httpBackend.flush();

        expect(notes).not.to.be.empty;
        expect(notes).to.be.instanceof(Array);
        expect(notes).to.have.length(3);
        expect(notes).deep.equal(response);
    });

    it('should delete note', function() {
        notesService.notes = response;
        var note = {_id: 2, title: 'Note 2', text: 'Text 2', tag: 'Tag 2', user: 1};

        $httpBackend.when('DELETE', '/api/v1/Notes/2').respond(note);
        notesService.deleteNote(note);

        $httpBackend.flush();

        expect(notesService.notes).not.to.be.empty;
        expect(notesService.notes).to.have.length(2);
        expect(notesService.notes).to.deep.include.members([
            {_id: 1, title: 'Note 1', text: 'Text 1', tag: 'Tag 1', user: 1},
            {_id: 3, title: 'Note 3', text: 'Text 3', tag: 'Tag 3', user: 1}]);
        expect(note).deep.equal({_id: 2, title: 'Note 2', text: 'Text 2', tag: 'Tag 2', user: 1});
    });

    it('should edit note', function() {
        notesService.notes = response;
        var note = {_id: 2, title: 'Note 2', text: 'Text 2', tag: 'Tag 2', user: 1};
        var noteToUpdate = {_id: 2, title: 'Note new', text: 'Text new', tag: 'Tag new', user: 1};

        $httpBackend.when('PUT', '/api/v1/Notes/2').respond(noteToUpdate);

        notesService.updateNote(noteToUpdate);

        $httpBackend.flush();
        expect(notesService.notes[1]).not.deep.equal(note);
        expect(angular.fromJson(notesService.notes[1])).deep.equal(noteToUpdate);
    })

    it('should be main view', function() {
        notesService.switchToMain();
        expect(notesService.isMain()).to.be.true;
        expect(notesService.isList()).to.be.false;
    });
    it('should be list view', function() {
        notesService.switchToList();
        expect(notesService.isList()).to.be.true;
        expect(notesService.isMain()).to.be.false;
    });

    it('notes should be visible', function() {
        notesService.showNotes();
        expect(notesService.isVisible()).to.be.true;
    });

    it('notes should be hidden', function() {
        notesService.hideNotes();
        expect(notesService.isVisible()).to.be.false;
    });
})