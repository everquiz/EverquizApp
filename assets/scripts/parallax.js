(function () { 
  document.onreadystatechange = function () {
    var state = document.readyState
    if (state == 'complete') {
        parallax();
    }
  };

  function scrollOffsetForElemById(elemId) {
  	return document.getElementById(elemId).offsetTop - window.innerHeight || 0;
  };

  function parallax() {
    window.requestAnimationFrame = (function () {
        return  window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (f) {window.setTimeout(f, 1000 / 60);}; 
    })();
    
    function parallaxbubbles() {
    	var notesScrollOffset = scrollOffsetForElemById('notes');
      if (notesScrollOffset <= window.scrollY) {
        var notesScrollTop = window.scrollY - notesScrollOffset;
        var scrolledPercent = Math.round(notesScrollTop / 0.88) / 100;

        var dollarPosition = 70 - scrolledPercent * 10 + '%';

        var backgroundPosition = '100% ' + dollarPosition;

        document.getElementById('notes').style.backgroundPosition = backgroundPosition;
      }	    

      var resultScrollOffset = scrollOffsetForElemById('result');
      if (resultScrollOffset <= window.scrollY) {
        var resultScrollTop = window.scrollY - resultScrollOffset;
        var scrolledPercent = Math.round(resultScrollTop / 0.88) / 100;

        var bulletClosePosition = 150 - scrolledPercent * 9 + '%';
        var revolversPosition = 70 - scrolledPercent  * 3 + '%';
        var bulletFarPosition = 10 + scrolledPercent * 2 + '%';
        var logoPosition = 120 - scrolledPercent * 3 + '%';

        var resultBackgroundPosition = '50% ' + logoPosition + ', 90% ' + bulletFarPosition + ', 50% ' + revolversPosition + ', 0% ' + bulletClosePosition;

        document.getElementById('result').style.backgroundPosition = resultBackgroundPosition;
      }
    };
     
    window.addEventListener('scroll', function() {
     requestAnimationFrame(parallaxbubbles)
    }, false)
  };
})();