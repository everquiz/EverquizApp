(function() {
  'use strict'

  angular
      .module('everquizApp')
      .service('notesService', notesService);

  notesService.$inject = ['$http', 'profileFactory', 'authFactory'];

  function notesService($http, profileFactory, authFactory) {

    //Public
    var self = this;

    self.notes = [];
    self.emptyNotesNum = null;
    self.realNotesNum = null;

    self.addNote = addNote;
    self.getNotes = getNotes;
    self.deleteNote = deleteNote;
    self.updateNote = updateNote;
    self.hideNotes = hideNotes;
    self.showNotes = showNotes;
    self.isVisible = isVisible;
    self.isMain = isMain;
    self.isList = isList;
    self.switchToMain = switchToMain;
    self.switchToList = switchToList;


    //Private
    var display = false;
    if (authFactory.isLoggedIn()) display = true;
    var mainDisplay = true;
    var listDisplay = false;


    //Implementation
    function addNote(note) {
      note.user = authFactory.currentUserId();
      if (note.user) {
        return $http.post('/api/v1/Notes/', note).then(function (res) {
          self.notes.push(res.data);
          profileFactory.addAchievement('5614d7cd60a7a12614a331b7');
          profileFactory.updateProfile();
          setLimit();
        });
      }
    };

    function getNotes() {
      var id = authFactory.currentUserId();
      if (id) {
        mainDisplay = true;
        listDisplay = false;
        return $http.get('/api/v1/Notes?user=' + id).then(function (res) {
          self.notes = res.data;
          setLimit();
          return self.notes;
        });
        }
    }

    function updateNote(note) {
      if (authFactory.isLoggedIn()) {
        return $http.put('/api/v1/Notes/' + note._id, note).then(function (res) {
          self.notes.forEach(function (item, i, notes) {
            if (item._id === note._id) {notes[i] = note; return;}
          })
        })
      }
    }

    function deleteNote(note) {
      return $http.delete('/api/v1/Notes/' + note._id).then(function (res) {
            self.notes.forEach(function(item, i, notes){
              if (item._id === note._id) {
                notes.splice(i, 1);
                return;
              }
            })
        setLimit();
      })
    }

    function hideNotes() {
      display = false;
    };

    function showNotes() {
      display = true;
    };

    function isVisible() {
      return display;
    }

    function isMain() {
      return mainDisplay;
    }

    function isList() {
      return listDisplay;
    }

    function switchToList() {
      listDisplay = true;
      mainDisplay = false;
    }

    function switchToMain() {
      listDisplay = false;
      mainDisplay = true;
    }

    function setLimit() {
      if (self.notes.length < 8) {
        self.emptyNotesNum = self.notes.length;
        self.realNotesNum = 8 - self.notes.length;
      }
      else {
        self.emptyNotesNum = 8;
        self.realNotesNum = 0;
      }
    }

  }

})();