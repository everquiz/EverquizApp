describe("Testing Modules", function() {
    describe("everquizApp Module", function() {

        var module;
        before(function() {
            module = angular.module("everquizApp");
        });

        it("should be registered", function() {
            expect(module).not.to.equal(null);
        });

        describe("everquiz module dependencies", function() {

            var deps;
            var hasModule = function(m) {
                return deps.indexOf(m) >= 0;
            };
            before(function() {
                deps = module.value('everquizApp').requires;
            });

            //you can also test the module's dependencies
            it("should have ui.router as a dependency", function() {
                expect(hasModule('ui.router')).to.equal(true);
            });

            it("should have templates as a dependency", function() {
                expect(hasModule('templates')).to.equal(true);
            });

            it("should have ui.bootstrap as a dependency", function() {
                expect(hasModule('ui.bootstrap')).to.equal(true);
            });

            it("should have dndLists as a dependency", function() {
                expect(hasModule('dndLists')).to.equal(true);
            });

            it("should have ngDialog as a dependency", function() {
                expect(hasModule('ngDialog')).to.equal(true);
            });

            it("should have chart.js as a dependency", function() {
                expect(hasModule('chart.js')).to.equal(true);
            });

            it("should have ngAlertify as a dependency", function() {
                expect(hasModule('ngAlertify')).to.equal(true);
            });
        });
    });
});