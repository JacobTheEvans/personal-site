var app = angular.module("app",["ngRoute","app.home","app.blog","app.article", "angulartics", "angulartics.google.analytics"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/", {
    redirectTo: "/home"
  })
  .otherwise({
    redirectTo: "/home"
  });
}]);
