document.onreadystatechange = function () {
  var state = document.readyState
  if (state == 'complete') {
      parallax();
  }
}
function parallax(){
  // Create cross browser requestAnimationFrame method:
  window.requestAnimationFrame = window.requestAnimationFrame
   || window.mozRequestAnimationFrame
   || window.webkitRequestAnimationFrame
   || window.msRequestAnimationFrame
   || function(f){setTimeout(f, 1000/60)}
   
  function parallaxbubbles(){
    var scrollOffsetForElem = document.getElementById('result').offsetTop - window.innerHeight;
    if (scrollOffsetForElem <= window.scrollY) {
      var scrollTop = window.scrollY - scrollOffsetForElem; // get number of pixels document has scrolled vertically 
      var scrolledPercent = Math.round(scrollTop / 8.8) / 10;

      var bulletClosePosition = 30 + scrolledPercent * 6 + '%';
      var revolversPosition = 35 + scrolledPercent  * 2 + '%';
      var bulletFarPosition = 50 - scrolledPercent * 3 + '%';
      var logoPosition = 110 - scrolledPercent * 2 + '%';

      var backgroundPosition = '90% ' + bulletFarPosition + ', 50% ' + revolversPosition + ', 0% ' + bulletClosePosition + ', ' + '50% ' + logoPosition;
      console.log(backgroundPosition);

      document.getElementById('result').style.backgroundPosition = backgroundPosition;

    };
    
  }
   
  window.addEventListener('scroll', function(){ // on page scroll
   requestAnimationFrame(parallaxbubbles) // call parallaxbubbles() on next available screen paint
  }, false)
};