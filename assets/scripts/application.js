;(function() {
  /*
  Compare two arrays
   */
  Array.prototype.diff = function(a) {
      return this.filter(function(i) {return a.indexOf(i) < 0;});
  };
  Array.prototype.diffInvers = function(a) {
      return this.filter(function(i) {return a.indexOf(i) >= 0;});
  };
  Object.defineProperty(Array.prototype, 'diff', { enumerable: false });
  Object.defineProperty(Array.prototype, 'diffInvers', { enumerable: false });

  /*
  Sorting array
   */
  function dynamicSort(property) {
      var sortOrder = 1;
      if(property[0] === "-") {
          sortOrder = -1;
          property = property.substr(1);
      }
      return function (a,b) {
          var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
          return result * sortOrder;
      }
  }
  Object.defineProperty(Array.prototype, "sortBy", {
      enumerable: false,
      writable: true,
      value: function() {
          return this.sort(dynamicSort.apply(null, arguments));
      }
  });

  /*
  Shuffle array
   */
  Array.prototype.shuffle = function (array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };
  Object.defineProperty(Array.prototype, 'shuffle', { enumerable: false });
})();