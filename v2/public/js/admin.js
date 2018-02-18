var app = angular.module("app",["ngRoute","app.login","app.manage","app.maker","app.preview"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/", {
    redirectTo: "/login"
  })
  .otherwise({
    redirectTo: "/login"
  });
}]);
