"use strict";
var app = angular.module("mainApp",["ngRoute","mainApp.home","mainApp.blog","mainApp.article"]);
app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/" , {
    redirectTo: "/home"
  })
  .otherwise({
    redirectTo: "/home"
  });
}]);

app.controller("navController", ["$scope", "$location", "anchorSmoothScroll", function($scope, $location, anchorSmoothScroll) {
  $scope.gotoElement = function (eID){
    $location.hash('bottom');
    try {
      anchorSmoothScroll.scrollTo(eID);
    } catch(err) {
      window.location.replace("#/home");
    }
  };
}]);
