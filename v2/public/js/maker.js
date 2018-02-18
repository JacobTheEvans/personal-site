var app = angular.module("app.maker",["ngRoute","ngCookies","ui.ace"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/maker/:type", {
    templateUrl: "/views/templates/maker.tpl.html",
    controller: "makerController"
  })
}]);

app.controller("makerController", ["$scope", "$timeout", "adminRequests", "$cookies", "$routeParams", "storageJSON", function($scope, $timeout, adminRequests, $cookies, $routeParams, storageJSON) {
  $scope.type = $routeParams.type;
  $scope.formdata = {};
  if(storageJSON.loadJSON()) {
    $scope.formdata = storageJSON.loadJSON();
  }
  $scope.redirect = function() {
    window.location.href = "/#/home";
  };
  $scope.save = function() {
    storageJSON.saveJSON($scope.formdata);
  };
  $scope.redirectToPreview = function() {
    window.location.href = "/admin/#/preview/" + $scope.type;
  };
  $scope.loadPreview = function() {
    $scope.save();
    $scope.redirectToPreview();
  };
  $scope.logSuc = function(response) {
    window.location.href = "/admin/#/manage";
  };
  $scope.logFail = function(response) {
    console.log(response.data);
  };
  $scope.submit = function() {
    if($scope.type == "Blog") {
      adminRequests.requestNewPost($cookies.get("UserToken"),$scope.formdata.title,$scope.formdata.auth,$scope.formdata.text,$scope.formdata.postDate,$scope.logSuc,$scope.logFail);
    } else if($scope.type == "Portfolio") {
      adminRequests.requestNewPort($cookies.get("UserToken"),$scope.formdata.name,$scope.formdata.desc,$scope.formdata.images,$scope.formdata.git,$scope.logSuc,$scope.logFail);
    }
  };
  $scope.updateMDL = function() {
    componentHandler.upgradeAllRegistered();
  };
  setTimeout(function() {
    $scope.updateMDL();
    $("#loading").hide();
  }, 1000);
}]);
