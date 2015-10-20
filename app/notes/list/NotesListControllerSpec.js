describe('NotesListController', function () {
    var NotesListCtrl;
    var notesService;

    // Set up the module
    beforeEach(module('everquizApp'));

    beforeEach(inject(function ($controller, $window, _notesService_) {
            notesService = _notesService_;
            notesService.updateNote = sinon.stub();
            notesService.deleteNote = sinon.stub();
            notesService.addNote = sinon.stub();

            NotesListCtrl = $controller('NotesListController');
        })
    );

    it('should be able to switch to main', function () {
        expect(NotesListCtrl.switchToMain).not.to.be.undefined;
    });

    it('should be able to delete note', function () {
        expect(notesService.deleteNote).not.to.be.undefined;
    });

    it('should be able to add note', function () {
        expect(NotesListCtrl.addNote).not.to.be.undefined;
        expect(NotesListCtrl.showCreate).not.to.be.undefined;
        expect(NotesListCtrl.hideCreate).not.to.be.undefined;
        expect(NotesListCtrl.toggleCreate).not.to.be.undefined;

        NotesListCtrl.addNote({id: 1});
        expect(notesService.addNote).to.have.been.calledWith({id: 1});

        NotesListCtrl.createMenuActive = false;
        NotesListCtrl.showCreate();

        expect(NotesListCtrl.createMenuActive).to.be.true;

        NotesListCtrl.hideCreate();

        expect(NotesListCtrl.createMenuActive).to.be.false;

        NotesListCtrl.toggleCreate();
        expect(NotesListCtrl.createMenuActive).to.be.true;
    });

    it('should be able to update note', function () {
        expect(NotesListCtrl.updateNote).not.to.be.undefined;
        expect(NotesListCtrl.showEdit).not.to.be.undefined;
        expect(NotesListCtrl.hideEdit).not.to.be.undefined;
        expect(NotesListCtrl.toggleEdit).not.to.be.undefined;

        NotesListCtrl.updateNote({id: 1});
        expect(notesService.updateNote).to.have.been.calledWith({id: 1});

        NotesListCtrl.editMenuActive = false;
        NotesListCtrl.showEdit();

        expect(NotesListCtrl.editMenuActive).to.be.true;

        NotesListCtrl.hideEdit();

        expect(NotesListCtrl.editMenuActive).to.be.false;

        NotesListCtrl.toggleEdit();
        expect(NotesListCtrl.editMenuActive).to.be.true;

        NotesListCtrl.editInit({id: 1});
        expect(NotesListCtrl.editMenuActive).to.be.true;
    });

    it('should be able to toggle favourite status for note', function () {
        var note = {favourite: false};
        NotesListCtrl.toggleFavourite(note);

        expect(NotesListCtrl.toggleFavourite).not.to.be.undefined;
        expect(note.favourite).to.be.true;

        NotesListCtrl.toggleFavourite(note);

        expect(note.favourite).to.be.false;
    });

    it('should be able to drag notes', function () {
        NotesListCtrl.onDragStyle = true;

        expect(NotesListCtrl.toggleDragStyle).not.to.be.undefined;
        expect(NotesListCtrl.toggleDragStyle()).to.be.false;
        expect(NotesListCtrl.toggleDragStyle()).to.be.true;

        NotesListCtrl.notes = [{id: 1}, {id: 2}, {id: 3}];

        NotesListCtrl.onMove(1);
        expect(NotesListCtrl.notes).to.have.length(2);
        expect(NotesListCtrl.notes).deep.equal([{id: 1}, {id: 3}]);

        NotesListCtrl.deletedList = [{id: 1}, {id: 2}, {id: 3}];

        NotesListCtrl.onDeletedMove(1);
        expect(NotesListCtrl.deletedList).to.have.length(2);
        expect(NotesListCtrl.deletedList).deep.equal([{id: 1}, {id: 3}]);
    });

    it('should be able clean up recycle bin', function () {
        NotesListCtrl.deletedList = [{id: 1}, {id: 2}, {id: 3}];
        NotesListCtrl.RecycleCleanUp();

        expect(NotesListCtrl.deletedList).to.have.length(0);
    });
});
