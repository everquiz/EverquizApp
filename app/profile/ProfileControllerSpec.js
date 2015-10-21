describe('ProfileController', function () {
    var ProfileCtrl;
    var profileFactory;
    var scrollFactory;
    var ngDialog;

    // Set up the module
    beforeEach(module('everquizApp'));

    beforeEach(inject(function ($controller, _profileFactory_, _scrollFactory_, _ngDialog_) {
            profileFactory = _profileFactory_;
            scrollFactory = _scrollFactory_;
            ngDialog = _ngDialog_;
            profileFactory.getProfile = sinon.stub();
            profileFactory.hideProfile = sinon.stub();
            ngDialog.open = sinon.stub();
            scrollFactory.scroll = sinon.stub();

            ProfileCtrl = $controller('ProfileController');
        })
    );

    it('should be able to get profile by default', function () {
        expect(ProfileCtrl.profileInit).not.to.be.undefined;
        ProfileCtrl.profileInit();
        expect(ProfileCtrl.profile).to.be.undefined;
    });

    it('should be able to hide profile', function () {
        expect(ProfileCtrl.hideProfile).not.to.be.undefined;
        ProfileCtrl.hideProfile();
        expect(profileFactory.hideProfile).to.have.been.called;
    });

    it('should be able to open chart modal window', function () {
        expect(ProfileCtrl.clickToOpen).not.to.be.undefined;
        ProfileCtrl.clickToOpen();
        expect(ngDialog.open).to.have.been.called;
    });

    it('should be able to scroll to notes', function () {
        expect(ProfileCtrl.goToElement).not.to.be.undefined;
        ProfileCtrl.goToElement();
        expect(scrollFactory.scroll).to.have.been.called;
    });
});