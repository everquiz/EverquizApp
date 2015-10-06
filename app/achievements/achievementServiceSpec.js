'use strict';

describe("AchievementService", function() {
    var achievementService, $httpBackend, achievements, url, regex;

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
        url = '/api/v1/Achievements';
        regex = new RegExp(url + '/([0-9]+)');
    }));

    it('should get achievements from the server', function () {
        
        $httpBackend.whenGET(url + '?select=title,description').respond({
            data: achievements
        });
        var achievementsAll = [];
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
        $httpBackend.whenPOST(url).respond(function (method, url, data) {
                achievements.push(angular.fromJson(data));
                return [200, {}, {}];
            });
        expect(achievements).not.to.be.empty;
        expect(achievements).to.be.instanceof(Array);
        expect(achievements).to.have.length(3);

        achievementService.create({title: 'Welcome', description: 'Welcome to our awesome service!'});
        
        $httpBackend.flush();

        expect(achievements).not.to.be.empty;
        expect(achievements).to.have.length(4);
        expect(achievements).to.deep.include.members([
            {title: 'Welcome',description: 'Welcome to our awesome service!'}]);
    });

    it('should get achievement from the server', function () {
        var regex = new RegExp(url + '/([0-9]+)');
        var achievement;
        $httpBackend.whenGET(regex.test('/api/v1/Achievements')).respond(function (method,url,data) {
                achievements.forEach(function(element, index) {
                    if(element._id === +url.match(regex)[1]) {
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
        expect(achievement).deep.equal(achievements[0]);
        expect(achievement).not.deep.equal(
            {_id: 1, title: 'Welcome1', description: 'Welcome to our awesome service!'});
    });

    it('should delete achievement from server', function () {
        var achievement;
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

        $httpBackend.flush();

        expect(achievements).not.to.be.empty;
        expect(achievements).to.have.length(2);
        expect(achievements).to.deep.include.members([
            {_id: 1,title: 'Welcome',description: 'Welcome to our awesome service!'},
            {_id: 3,title: 'First note',description: 'You have created your first note!'}]);
        expect(achievement).deep.equal({_id: 2,title: 'First quiz',description: 'Congratulation on passing your first quiz!'});
    });

    it('should update achievement from server', function () {
        var achievement,
            achievementToUpdate = {
                _id: 2,
                title: 'Congratulation',
                description: 'Congratulation on passing your first quiz!'
            };
        $httpBackend.whenPUT(regex.test(url)).respond(function (method,url,data) {
            achievements.forEach(function(element, index) {
                if(element._id === +url.match(regex)[1]) {
                    achievements[index] = data;
                    achievement = element;
                    return [200, element, {}];
                }
            });
            return [404, 'Not found', {}];
        })
        achievementService.update(achievementToUpdate);

        $httpBackend.flush();
        expect(achievements[1]).not.deep.equal(achievement);
        expect(angular.fromJson(achievements[1])).deep.equal(achievementToUpdate);
    });
});