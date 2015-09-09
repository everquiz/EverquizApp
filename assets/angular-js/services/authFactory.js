app.factory('authFactory', ['$http', '$window', function($http, $window){
	var auth = {};
	
	auth.saveToken = function (token){
 		$window.localStorage['everquizApp-token'] = token;
	};

	auth.getToken = function (){
		return $window.localStorage['everquizApp-token'];
	};

	auth.isLoggedIn = function(){
		var token = auth.getToken();
		if(token){
	    	var payload = JSON.parse($window.atob(token.split('.')[1]));
	    	return payload.exp > Date.now() / 1000;
	  	} else {
	    	return false;
	 	}
	};

  auth.checkRole = function() {
    return $http.get('/status', {
      headers: {Authorization: 'Bearer ' + auth.getToken()}
    }).success(function(data) {
      if (data === 'admin') {
        console.log(data);
        return true;
      } else {
        return false;
      }
    });
  }

  auth.isAdmin = function(){
    if(auth.isLoggedIn()){
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        if (payload.roles[0] === 'admin') {
          return true
        };
        return false;
      }
  };

  auth.isUser = function(){
    var token = auth.getToken();
    if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        
        console.log('isUser()');


        $http.get('/status', {
          headers: {Authorization: 'Bearer ' + auth.getToken()}
        }).success(function(data) {
          if (data === 'user') {
            console.log(data);
            return true;
          };
        })
      } else {
        return false;
    }
  };

	auth.currentUser = function(){
  		if(auth.isLoggedIn()){
    		var token = auth.getToken();
  	  		var payload = JSON.parse($window.atob(token.split('.')[1]));

    		return payload.email;
  		}
	};

	auth.register = function(user){
	  	return $http.post('/register', user).success(function(data){
	    	auth.saveToken(data.token);
	  	});
	};

	auth.logIn = function(user){
		return $http.post('/login', user).success(function(data){
	    	auth.saveToken(data.token);
	  	});
	};
	

	auth.logOut = function(){
  		$window.localStorage.removeItem('everquizApp-token');
	};

	return auth;
}]);