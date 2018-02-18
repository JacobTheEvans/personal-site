"use strict";
var app = angular.module("mainApp.home",["ngRoute"]);
app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/home" , {
    controller: "homeController",
    templateUrl: "core/templates/home.tpl.html"
  })
}]);

app.controller("homeController", ["$scope", "$location", "anchorSmoothScroll", "portfolioData", function($scope, $location, anchorSmoothScroll, portfolioData) {
  $scope.gotoElement = function (eID){
    $location.hash('bottom');
    anchorSmoothScroll.scrollTo(eID);
  };
  $scope.loadProjects = function() {
    $scope.projects = portfolioData.getData();
  };
  $scope.setProject = function(project) {
    $scope.currentProject = project;
    $scope.currnetImageIndex = 0;
  }
  $scope.addIndex = function() {
    if($scope.currnetImageIndex > $scope.currentProject.images.length - 2) {
      $scope.currnetImageIndex = 0;
    } else {
      $scope.currnetImageIndex += 1;
    }
  };
  $scope.subIndex = function() {
    if($scope.currnetImageIndex < 1) {
      $scope.currnetImageIndex = $scope.currentProject.images.length - 1;
    } else {
      $scope.currnetImageIndex -= 1;
    }
  };
}]);
