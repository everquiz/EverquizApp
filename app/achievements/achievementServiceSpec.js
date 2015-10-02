'use strict';

describe("AchievementService", function() {
    var achievementService, $httpBackend, achievements;

    // Set up the module
    beforeEach(module('everquizApp'));

    beforeEach(inject(function (_achievementService_, _$httpBackend_) {
        achievementService = _achievementService_;
        $httpBackend = _$httpBackend_;
        achievements = [
                {
                    _id: 1,
                    title: 'Welcome',
                    description: 'Welcome to our awesome service!'
                },
                {
                    _id: 2,
                    title: 'First quiz',
                    description: 'Congratulation on passing your first quiz!'
                },
                {
                    _id: 3,
                    title: 'First note',
                    description: 'You have created your first note!'
                }
            ];
    }));

    it('should get achievements from the server', function () {
        
        $httpBackend.whenGET('/api/v1/Achievements?select=title,description').respond({
            data: achievements
        });
        var achievementsAll = []
        achievementService.getAll()
            .then(function (res) {
                achievementsAll = res.data;
            });

        expect(achievementsAll).to.be.empty;
        expect(achievementsAll).to.be.instanceof(Array);
        expect(achievementsAll).to.have.length(0);
        
        $httpBackend.flush();

        expect(achievementsAll).not.to.be.empty;
        expect(achievementsAll).to.be.instanceof(Array);
        expect(achievementsAll).to.have.length(3);
        expect(achievementsAll).deep.equal(achievements);
    });

    it('should post achievement to the server', function () {
        var achievements = [];
        $httpBackend.whenPOST('/api/v1/Achievements').respond(function (method, url, data) {
                achievements.push(angular.fromJson(data));
                return [200, {}, {}];
            });
        expect(achievements).to.be.empty;
        expect(achievements).to.be.instanceof(Array);
        expect(achievements).to.have.length(0);

        achievementService.create({title: 'Welcome', description: 'Welcome to our awesome service!'});
        
        $httpBackend.flush();

        expect(achievements).not.to.be.empty;
        expect(achievements).to.have.length(1);
        expect(achievements).to.deep.include.members([
            {title: 'Welcome',description: 'Welcome to our awesome service!'}]);
    });

    it('should get achievement from the server', function () {
        var regex = new RegExp('/api/v1/Achievements/([0-9]+)');
        // var achievements = [{_id: '1', title: 'Welcome', description: 'Welcome to our awesome service!'}];
        var achievement;
        $httpBackend.whenGET(regex.test('/api/v1/Achievements')).respond(function (method,url,data) {
                achievements.forEach(function(element, index) {
                    if(element._id === +url.match(regex)[1]) {
                        console.log('element', element);
                        achievement = element;
                        return [200, element, {}];
                    }
                });
                return [404, 'Not found', {}];
            });

        achievementService.get('1');
       
        $httpBackend.flush();

        expect(achievement).not.to.be.empty;
        expect(achievement).to.be.instanceof(Object);
        expect(achievement).deep.equal(
            {_id: '1', title: 'Welcome', description: 'Welcome to our awesome service!'});
        expect(achievement).not.deep.equal(
            {_id: '1', title: 'Welcome1', description: 'Welcome to our awesome service!'});
    });

    it('should delete achievement from server', function () {
        var achievements = [
                {
                    _id: 1,
                    title: 'Welcome',
                    description: 'Welcome to our awesome service!'
                },
                {
                    _id: 2,
                    title: 'First quiz',
                    description: 'Congratulation on passing your first quiz!'
                },
                {
                    _id: 3,
                    title: 'First note',
                    description: 'You have created your first note!'
                }
            ];
        var achievement;
        var regex = new RegExp('/api/v1/Achievements/([0-9]+)');
        var url = '/api/v1/Achievements';
        $httpBackend.whenDELETE(regex.test(url)).respond(function (method,url,data) {
                achievements.forEach(function(element, index) {
                    if(element._id === +url.match(regex)[1]) {
                        achievements.splice(index, 1);
                        achievement = element;
                        return [200, element, {}];
                    }
                });
                return [404, 'Not found', {}];
            });
        achievementService.remove(achievements[1]);

        expect(achievements).not.to.be.empty;
        expect(achievements).to.have.length(3);
        expect(achievements).to.deep.include.members([
            {_id: 1,title: 'Welcome',description: 'Welcome to our awesome service!'},
            {_id: 2,title: 'First quiz',description: 'Congratulation on passing your first quiz!'},
            {_id: 3,title: 'First note',description: 'You have created your first note!'}]);

        $httpBackend.flush();

        expect(achievements).not.to.be.empty;
        expect(achievements).to.have.length(2);
        expect(achievements).to.deep.include.members([
            {_id: 1,title: 'Welcome',description: 'Welcome to our awesome service!'},
            {_id: 3,title: 'First note',description: 'You have created your first note!'}]);
        expect(achievement).deep.equal({_id: 2,title: 'First quiz',description: 'Congratulation on passing your first quiz!'});
    })
});