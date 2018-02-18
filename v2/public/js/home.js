var app = angular.module("app.home",["ngRoute"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/home", {
    templateUrl: "/views/templates/home.tpl.html",
    controller: "homeController"
  })
}]);

app.service("portfolioRequests", ["$http", function($http) {
  this.getPorts = function(isSuc,isFail) {
    $http.get("http://localhost:8080/portfolio").then(isSuc,isFail);
  };
}]);

app.controller("homeController", ["$scope", "portfolioRequests", "$anchorScroll", function($scope, portfolioRequests, $anchorScroll) {
  $scope.index = 0;
  $scope.gotoElement = function (eID){
    $anchorScroll(eID);
  };
  $scope.logError = function(response) {
    console.log(response.data);
  };
  $scope.loadProjects = function() {
    portfolioRequests.getPorts(function(response) {
      $scope.projects = response.data;
      $scope.setProject($scope.projects[0]);
    },$scope.logError);
  };
  $scope.setProject = function(project) {
    $scope.currentProject = project;
    $scope.currnetImageIndex = 0;
  };
  $scope.addIndex = function() {
    $scope.index += 1;
    if ($scope.index > $scope.projects.length -1) {
      $scope.index = 0;
    }
    $scope.setProject($scope.projects[$scope.index]);
  };
  $scope.subIndex = function() {
    $scope.index -= 1;
    if ($scope.index <= 0) {
      $scope.index = $scope.projects.length - 1;
    }
    $scope.setProject($scope.projects[$scope.index]);
  };
  $scope.updateMDL = function() {
    componentHandler.upgradeAllRegistered();
  };
  var vid = document.getElementById("bgvid");
  vid.addEventListener('ended', function()
  {
    vid.pause();
    vidFade();
  });
  setTimeout(function() {
    $scope.updateMDL();
    vid.play();
    $("#loading").hide();
  }, 1000);
}]);
