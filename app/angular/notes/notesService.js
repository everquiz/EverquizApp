(function() {
  'use strict'

  angular
      .module('everquizApp')
      .service('notesService', notesService);

  notesService.$inject = ['$http', 'authFactory'];

  function notesService($http, authFactory) {

    var notes = [];
    var isLoaded = false;
    var id = authFactory.currentUserId();
    var display = false;
    if (id) display = true;
    var mainDisplay = true;
    var listDisplay = false;

    this.addNote = function(note) {
      note.user = id;
      if (id)
      $http.post('/api/v1/Notes/', note).then(function(res) {
        notes.push(res.data);
      });
    };

    this.getNotes = function() {
      //if (isLoaded) return notes;
      var id = authFactory.currentUserId();
      if (id) {
        return $http.get('/api/v1/Notes?user=' + id).then(function (res) {
          notes = res.data;
          //isLoaded = true;
          return notes;
        });
        //}
      }
    }

    this.updateNote = function(note) {
      $http.put('/api/v1/Notes/' + note._id, note).then(function (res) {
            notes.forEach(function(item, i, notes){
              if (item._id === note._id) {
                notes[i] = note;
                return;
              }
            })
          }
      )
    }

    this.deleteNote = function(note) {
      $http.delete('/api/v1/Notes/' + note._id).then(function (res) {
            notes.forEach(function(item, i, notes){
              if (item._id === note._id) {
                notes.splice(i, 1);
                return;
              }
            })
          }
      )
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

    //this.setLimit = function(newLimit) {
    //  limit = newLimit;
    //}

    this.isMain = function() {
      return mainDisplay;
    }

    this.isList = function() {
      return listDisplay;
    }

    this.switchToList = function() {
      listDisplay = true;
      mainDisplay = false;
    }

    this.switchToMain = function() {
      listDisplay = false;
      mainDisplay = true;
    }

  }

})();