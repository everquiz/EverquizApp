app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/'
      })
      .state('users', {
        url: '/users',
        templateUrl: '/users.html',
        controller: 'MainCtrl',
        resolve: {
          userPromise: ['userService', 
          function(userService){
            return userService.getAll();
          }]
        }
      })
      .state('dashboard', {
        url: '/dashboard/{id}',
        templateUrl: '/dashboard.html',
        controller: 'UserCtrl',
        resolve: {
          user: ['$stateParams', 'userService', 
          function($stateParams,  userService) {
            return userService.get($stateParams.id);
          }]
        }
      });
      // .state('posts', {
      //   url: '/posts/{id}',
      //   templateUrl: '/posts.html',
      //   controller: 'PostCtrl',
      //   resolve: {
      //     post: ['$stateParams', 'postService', 
      //     function($stateParams, postService) {
      //       return postService.get($stateParams.id);
      //     }]
      //   }
      // });

    $urlRouterProvider.otherwise('home');
}]);