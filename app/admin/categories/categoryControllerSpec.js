(function () {
    'use strict';
    describe('CategoryController', function () {
        
        var categoryService, $httpBackend, $window, ctrl, categoryToCreate, categoriesInit, categoryServiceMock, spyCreate;
        categoryToCreate = {"_id": "2","title": "SCSS","description": "SCSS"};
        categoryServiceMock = {
                create: sinon.stub(),
                update: sinon.stub(),
                remove: sinon.stub()
            };
        categoriesInit = [{"_id": "1","title": "CSS","description": "CSS"}];
        
        // Set up the module
        beforeEach(module('everquizApp', function ($provide) {
                $provide.value('categoryService', categoryServiceMock);
            }));

        beforeEach(inject(function (_$httpBackend_, $controller, _categoryService_, _$window_) {
                
                categoryService = _categoryService_;
                $httpBackend = _$httpBackend_;
                $window = _$window_;
                
                ctrl = $controller('CategoriesController', {categories: categoriesInit, categoryService: categoryService});
                sinon.stub($window, 'confirm', function () {return true;});
            }));
        afterEach(function () {
                $window.confirm.restore();
            });

        it('should get all categories on load', function () {
            expect(ctrl.categories).to.be.categoriesInit;
        });

        describe('add/update category', function () {
            beforeEach(function () {
                    categoryService.create.reset();
                    categoryService.update.reset();
                });
            it('should not add or edit category', function () {
                categoryToCreate = {"description": "SCSS"};
                ctrl.category = categoryToCreate;
                ctrl.addCategory();
                expect(categoryService.create).not.to.have.been.called;
                expect(categoryService.update).not.to.have.been.called;
                expect(ctrl.category).not.to.be.empty;
            });

            it('should add category', function () {
                categoryToCreate = {"title": "SCSS","description": "SCSS"};
                ctrl.category = categoryToCreate;
                ctrl.addCategory();
                expect(categoryService.create).to.have.been.called;
                expect(categoryService.update).not.to.have.been.called;
                expect(ctrl.category).to.be.empty;
            });
            it('should update category', function () {
                categoryToCreate = {"_id": 1,"title": "SCSS","description": "SCSS"};
                ctrl.category = categoryToCreate;
                ctrl.addCategory();
                expect(categoryService.create).not.to.have.been.called;
                expect(categoryService.update).to.have.been.called;
                expect(ctrl.category).to.be.empty;
            });
        });
        

        it('should edit category', function () {
            expect(ctrl.category).to.be.empty;
            ctrl.editCategory(categoryToCreate);
            expect(ctrl.category).to.be.equal(categoryToCreate);
        });

        // TODO Check confirm?
        it('should remove category', function () {
            ctrl.removeCategory(categoriesInit[0]);
            expect(categoryServiceMock.remove).to.have.been.calledWith(categoriesInit[0]);
            expect(ctrl.category).to.be.empty;
        });

        it('should reset title for category form', function () {

            ctrl.resetTitle();
            expect(ctrl.category).to.be.empty;
            expect(ctrl.formTitle).to.be.equal('Add new category');
        });

    });
})();