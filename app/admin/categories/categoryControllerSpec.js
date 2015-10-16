(function () {
    'use strict';

    var categoryService, $httpBackend, ctrl, categoryToCreate, categoriesInit, categoryServiceMock, spyCreate;
    categoryToCreate = {"_id": "2","title": "SCSS","description": "SCSS"};

    // Set up the module
    beforeEach(module('everquizApp'));

    describe('CategoryController', function () {
        
        categoriesInit = [{"_id": "1","title": "CSS","description": "CSS"}];

        beforeEach(function () {
            categoryServiceMock = {
                    create: sinon.stub(),
                    update: sinon.stub(),
                    remove: sinon.stub()
                };
        });
        

        // beforeEach(module('everquizApp', function ($provide) {
        //         $provide.value('categoryService', categoryServiceMock);
        //     }));

        beforeEach(inject(function (_$httpBackend_, $controller) {
                // categoryService = _categoryService_;
                $httpBackend = _$httpBackend_;
                ctrl = $controller('CategoriesController', {categories: categoriesInit, categoryService: categoryServiceMock});
                ctrl.modalToggle = function () {return true;};
                ctrl.removeCategory = function(category) {categoryServiceMock.remove(category)}
            }));

        it('should get all categories on load', function () {
            expect(ctrl.categories).to.be.categoriesInit;
        });

        describe('add/update category', function () {
            it('should not add or edit category', function () {
                categoryToCreate = {"title": "SCSS"};
                ctrl.category = categoryToCreate;
                ctrl.addCategory();
                expect(categoryServiceMock.create.called).to.be.false;
                expect(categoryServiceMock.update.called).to.be.false;
                expect(ctrl.category).not.to.be.empty;
            });

            it('should add category', function () {
                categoryToCreate = {"title": "SCSS","description": "SCSS"};
                ctrl.category = categoryToCreate;
                ctrl.addCategory();
                expect(categoryServiceMock.create.called).to.be.true;
                expect(categoryServiceMock.update.called).to.be.false;
                expect(ctrl.category).to.be.empty;
            });

            it('should update category', function () {
                categoryToCreate = {"_id": 1,"title": "SCSS","description": "SCSS"};
                ctrl.category = categoryToCreate;
                ctrl.addCategory();
                expect(categoryServiceMock.create.called).to.be.false;
                expect(categoryServiceMock.update.called).to.be.true;
                expect(ctrl.category).to.be.empty;
            });
        })
        

        it('should edit category', function () {
            expect(ctrl.category).to.be.empty;
            ctrl.editCategory(categoryToCreate);
            expect(ctrl.category).to.be.equal(categoryToCreate);
        });

        // TODO Check confirm?
        it('should remove category', function () {
            ctrl.removeCategory(categoriesInit[0]);
            expect(categoryServiceMock.remove.calledWith(categoriesInit[0])).to.be.true;
            expect(ctrl.category).to.be.empty;
        });

        it('should reset title for category form', function () {
            ctrl.resetTitle();
            expect(ctrl.category).to.be.empty;
            expect(ctrl.formTitle).to.be.equal('Add new category');
        });

    });
})();