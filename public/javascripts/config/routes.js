app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('users', {
        url: '/users',
        templateUrl: '/users.html',
        controller: 'MainCtrl',
        resolve: {
          userPromise: ['userService', function(userService){
            return userService.getAll();
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

    $urlRouterProvider.otherwise('users');
}]);