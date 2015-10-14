(function () {
    'use strict';

    describe('CategoryService', function () {
        var categoryService, $httpBackend, categories;

        // Set up the module
        beforeEach(module('everquizApp'));

        beforeEach(inject(function (_categoryService_, _$httpBackend_) {
                categoryService = _categoryService_;
                $httpBackend = _$httpBackend_;
                categories = [{"_id": "1","title": "CSS","description": "CSS"}];
            }));

        it('should get categories', function () {
            var categoriesGetAll;
            $httpBackend.whenGET('/api/v1/Categories?select=_id,title,description')
                .respond(categories);
            categoriesGetAll = categoryService.getAll();
            $httpBackend.flush();
            expect(categoriesGetAll).to.deep.equal(categories);
        });

        it('should get category', function () {
            var category;
            $httpBackend.whenGET('/api/v1/Categories/1?select=title')
                .respond(categories[0]);
            categoryService.get(1).then(function (data) {
                category = data;
            });
            $httpBackend.flush();
            expect(category).to.deep.equal(categories[0]);
        });

        it('should create category', function () {
            var categoryToCreate;
            categoryToCreate = {_id: 2, title: 'RUBY', description: 'RUBY'};
            $httpBackend.whenPOST('/api/v1/Categories').respond(function (method, url, data) {
                    categories.push(angular.fromJson(data));
                    return 200;
                });
            categoryService.create(categoryToCreate);
            $httpBackend.flush();
            expect(categoryToCreate).to.deep.equal(categories[categories.length-1]);
            expect(categories.length).to.be.equal(2);
        });

        it('should delete category', function () {
            var categoryToDelete;
            categoryToDelete = {"_id": "1","title": "CSS","description": "CSS"};
            $httpBackend.whenDELETE('/api/v1/Categories/1').respond(function (method, url, data) {
                    categories.splice(0,1);
                    return 200;
                });
            categoryService.remove(categoryToDelete);
            $httpBackend.flush();
            expect(categories.length).to.be.equal(0);
            expect(categories).not.to.contain(categoryToDelete);
        });

        it('should update category', function () {
            var categoryToUpdate;
            categoryToUpdate = {"_id": "1","title": "SCSS","description": "SCSS"};
            $httpBackend.whenPUT('/api/v1/Categories/1').respond(function (method, url, data) {
                    categories[0] = angular.fromJson(data);
                    return 200;
                });
            categoryService.update(categoryToUpdate);
            $httpBackend.flush();
            expect(categoryToUpdate).to.deep.equal(categories[0]);
        });
    });
})();