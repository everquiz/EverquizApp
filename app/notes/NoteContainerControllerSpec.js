describe('NoteContainerController', function () {
    var NoteContainerCtrl;
    var notesService;

    // Set up the module
    beforeEach(module('everquizApp'));

    beforeEach(inject(function ($controller, $window, _notesService_) {
            notesService = _notesService_;

            NoteContainerCtrl = $controller('NotesContainerController');
        })
    );

    it('notes view should be hidden by default', function () {
        expect(notesService.isVisible()).not.to.be.undefined;
        expect(notesService.isVisible()).to.be.false;
    });

    it('notes main view should be active by default', function () {
        expect(notesService.isMain()).not.to.be.undefined;
        expect(notesService.isMain()).to.be.true;
    });

    it('notes list view should be inactive by default', function () {
        expect(notesService.isList()).not.to.be.undefined;
        expect(notesService.isList()).to.be.false;
    });
});
