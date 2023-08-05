var app = angular.module('trext', ['ngRoute']);
  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/home', {
        template: '<h2>Home Page</h2>'
      })
      .when('/about', {
        template: '<h2>About Page</h2>'
      })
      .when('/contact', {
        template: '<h2>Contact Page</h2>'
      })
      .otherwise({
        template: '<h2>404 Not Found</h2>'
      });
  }]);
