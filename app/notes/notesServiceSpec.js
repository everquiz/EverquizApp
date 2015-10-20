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
                tag: 'Tag 3',
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
        var note = {
            _id: 2,
            title: 'Note 2',
            text: 'Text 2',
            tag: 'Tag 3',
            user: 1
        };
        $httpBackend.when('DELETE', '/api/v1/Notes/2').respond(function (method,url,data) {
            response.forEach(function(element, index) {
                if(element._id === 2) {
                    response.splice(index, 1);
                    note = element;
                    return [200, element, {}];
                }
            });
            return [404, 'Not found', {}];
        });

        notesService.deleteNote(note);

        $httpBackend.flush();

        expect(response).not.to.be.empty;
        expect(response).to.have.length(2);
        expect(response).to.deep.include.members([
            {_id: 1, title: 'Note 1', text: 'Text 1', tag: 'Tag 1', user: 1},
            {_id: 3, title: 'Note 3', text: 'Text 3', tag: 'Tag 3', user: 1}]);
        expect(note).deep.equal({_id: 2, title: 'Note 2', text: 'Text 2', tag: 'Tag 3', user: 1});
    });

    it('should edit note', function() {
        var note;
        var noteToUpdate = {_id: 2, title: 'Note 2', text: 'Text 2', tag: 'Tag 3', user: 1};

        $httpBackend.when('PUT', '/api/v1/Notes/2').respond(function (method,url,data) {
            response.forEach(function(element, index) {
                if(element._id === 2) {
                    response[index] = data;
                    note = element;
                    return [200, element, {}];
                }
            });
            return [404, 'Not found', {}];
        })
        notesService.updateNote(noteToUpdate);

        $httpBackend.flush();
        expect(response[1]).not.deep.equal(note);
        expect(angular.fromJson(response[1])).deep.equal(noteToUpdate);
    })
})