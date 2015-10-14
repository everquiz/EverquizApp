(function () {
    'use strict';

    var categoryService, $httpBackend, ctrl, categoryToCreate;
    categoryToCreate = {"_id": "2","title": "SCSS","description": "SCSS"};

    // Set up the module
    beforeEach(module('everquizApp'));

    describe('CategoryController', function () {
        var categoriesInit = [{"_id": "1","title": "CSS","description": "CSS"}];

        beforeEach(inject(function (_categoryService_, _$httpBackend_, $controller) {
                categoryService = _categoryService_;
                $httpBackend = _$httpBackend_;
                ctrl = $controller('CategoriesController', {categories: categoriesInit});
            }));

        it('should get all categories on load', function () {
            expect(ctrl.categories).to.be.categoriesInit;
        });

        // TODO Should check if categoryService.create or update is called
        it('should add category', function () {
            var spy;
            ctrl.modalToggle = function () {};
            categoryToCreate = {"_id": "2","title": "SCSS","description": "SCSS"};
            ctrl.category = categoryToCreate;
            ctrl.addCategory();
            // spy = sinon.spy(categoryService, 'create');
            // spy.should.have.been.called.once;
            expect(ctrl.category).to.be.empty;
        });

        it('should edit category', function () {
            ctrl.modalToggle = function () {};
            expect(ctrl.category).to.be.empty;
            ctrl.editCategory(categoryToCreate);
            expect(ctrl.category).to.be.equal(categoryToCreate);
        });

        // TODO Should check if categoryService.remove is called
        it('should remove category', function () {
            ctrl.modalToggle = function () {};
            ctrl.removeCategory(categoryToCreate);
            expect(ctrl.category).to.be.empty;
        });

        it('should reset title for category form', function () {
            ctrl.modalToggle = function () {};
            ctrl.resetTitle();
            expect(ctrl.category).to.be.empty;
            expect(ctrl.formTitle).to.be.equal('Add new category');
        });

    });
})();