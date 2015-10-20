describe('NotesListController', function () {
    var NotesListCtrl;
    var notesService;

    // Set up the module
    beforeEach(module('everquizApp'));

    beforeEach(inject(function ($controller, $window, _notesService_) {
            notesService = _notesService_;
            notesService.updateNote = sinon.stub();

            NotesListCtrl = $controller('NotesListController');
        })
    );

    it('should be able to switch to list', function () {
        expect(notesService.switchToList).not.to.be.undefined;
    });

    it('should be able to switch to delete note', function () {
        expect(notesService.deleteNote).not.to.be.undefined;
    });

    it('should be able to switch to update note', function () {
        expect(notesService.updateNote).not.to.be.undefined;
    });

    it('should be able to get range Array', function () {
        expect(NoteMainCtrl.getRange).not.to.be.undefined;
        expect(NoteMainCtrl.getRange(8)).to.be.instanceof(Array);
        expect(NoteMainCtrl.getRange(8)).to.have.length(8);
    });

    it('should be able to toggle favourite status for note', function () {
        var note = {favourite: false};
        NoteMainCtrl.toggleFavourite(note);

        expect(NoteMainCtrl.toggleFavourite).not.to.be.undefined;
        expect(note.favourite).to.be.true;

        NoteMainCtrl.toggleFavourite(note);

        expect(note.favourite).to.be.false;
    });
});
