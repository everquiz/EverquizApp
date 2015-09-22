var myEvent = window.attachEvent || window.addEventListener;
var chkevent = window.attachEvent ? 'onbeforeunload' : 'beforeunload'; /// make IE7, IE8 compatable

myEvent(chkevent, function(e) { // For >=IE7, Chrome, Firefox
    var confirmationMessage = ' If you continue you will lose all unsaved information!';  // a space
    (e || window.event).returnValue = confirmationMessage;
    return confirmationMessage;
});

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};
Array.prototype.diffInvers = function(a) {
    return this.filter(function(i) {return a.indexOf(i) >= 0;});
};
Object.defineProperty(Array.prototype, 'diff', { enumerable: false });
Object.defineProperty(Array.prototype, 'diffInvers', { enumerable: false });