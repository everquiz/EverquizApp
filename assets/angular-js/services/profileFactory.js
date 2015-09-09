app
  .factory('profileFactory', [ profileFactory ]);
  
function profileFactory() {
  var _this = {};
  _this.profile = false;
  _this.showProfile = showProfile;
  _this.hideProfile = hideProfile;
  _this.getStatus = getStatus;
  return _this;

  function showProfile() {
    _this.profile = true;
  }
  function hideProfile() {
    _this.profile = false;
  }

  function getStatus() {
    return _this.profile;
  }

}

