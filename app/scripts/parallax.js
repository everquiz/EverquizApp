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
      var scrolltop = scrollOffsetForElem - window.scrollY; // get number of pixels document has scrolled vertically 
      document.getElementById('parallax-bullet-1').style.top = -scrolltop * .2 + 'px'; // move bubble1 at 20% of scroll rate
      document.getElementById('parallax-bullet-2').style.top = -scrolltop * .6 + 'px'; // move bubble2 at 50% of scroll rate
    };
    
  }
   
  window.addEventListener('scroll', function(){ // on page scroll
   requestAnimationFrame(parallaxbubbles) // call parallaxbubbles() on next available screen paint
  }, false)
};