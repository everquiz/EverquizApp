(function() {
  'use strict'

  angular
      .module('everquizApp')
      .service('notesService', notesService);

  notesService.$inject = ['$http', 'authFactory'];

  function notesService($http, authFactory) {

    var notes = [];
    var id = authFactory.currentUserId();
    var display = false;
    if (id) display = true;

    this.addNote = function(note) {
      note.user = id;
      if (id)
      $http.post('/api/v1/Notes/', note).then(function(res) {
        notes.push(res.data);
      });
    };

    this.getNotes = function() {
      var id = authFactory.currentUserId();
      if (id) {
        return $http.get('/api/v1/Notes?user=' + id + '&limit=8').then(function (res) {
          notes = res.data;
          return notes;
        });
      }
    }

    this.deleteNote = function(id) {
      $http.delete('/api/v1/Notes/:' + id).then(function (res) {
        notes = res.data;
        return notes;
      })
    }

    this.hideNotes = function () {
      display = false;
    };

    this.showNotes = function () {
      display = true;
    };

    this.isVisible = function () {
      return display;
    }

  }

})();