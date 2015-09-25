(function() {
  'use strict'

  angular
      .module('everquizApp')
      .service('notesService', notesService);

  notesService.$inject = ['$http', 'profileFactory', 'authFactory'];

  function notesService($http, profileFactory, authFactory) {

    var notes = [];
    var isLoaded = false;
    var id = authFactory.currentUserId();
    //console.log("id", id);
    var display = false;
    if (id) display = true;
    var mainDisplay = true;
    var listDisplay = false;

    this.addNote = function(note) {
      id = authFactory.currentUserId();
      note.user = id;
      console.log(note.rating);
      //console.log("id", id);
      if (id)
      $http.post('/api/v1/Notes/', note).then(function(res) {
        notes.push(res.data);
        profileFactory.updateProfile();
        //console.log("addNotes", notes);
      });
    };

    this.getNotesByFavourite = function() {
      //if (isLoaded) return notes;
      var id = authFactory.currentUserId();
      //console.log("id", id);
      if (id) {
        return $http.get('/api/v1/Notes?user=' + id + '&sort=-favourite').then(function (res) {
          notes = res.data;
          //console.log("getNotes", notes);
          //isLoaded = true;
          return notes;
        });
        }
      //}
    }

    this.getNotesByRating = function() {
      //if (isLoaded) return notes;
      var id = authFactory.currentUserId();
      //console.log("id", id);
      if (id) {
        return $http.get('/api/v1/Notes?user=' + id + '&sort=rating').then(function (res) {
          notes = res.data;
          //console.log("getNotes", notes);
          //isLoaded = true;
          return notes;
        });
      }
      //}
    }

    this.updateNote = function(note) {
      $http.put('/api/v1/Notes/' + note._id, note).then(function (res) {
            notes.forEach(function(item, i, notes){
              if (item._id === note._id) {
                notes[i] = note;
                //console.log("upadateNotes", notes);
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