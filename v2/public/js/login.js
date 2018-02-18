var app = angular.module("app.login",["ngRoute","ngCookies"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/login", {
    templateUrl: "/views/templates/login.tpl.html",
    controller: "loginController"
  })
}]);

app.controller("loginController", ["$scope", "adminRequests", "$cookies", function($scope, adminRequests, $cookies) {
  $scope.userdata = {};
  $scope.isBrother = false;
  $scope.toggleBrother = function() {
    $scope.isBrother = !$scope.isBrother;
  };
  $scope.redirect = function() {
    window.location.href = "http://jacobtheevans.com";
  };
  $scope.setUserToken = function(response) {
    if(!response.data.success) {
      alert(response.data.message);
    } else {
      var minutes = 40;
      var date = new Date();
      var expires = new Date(date.getTime() + minutes*60000);
      $cookies.put("UserToken",response.data.token,{expires:expires});
      window.location.href = "/admin#/manage";
    }
  };
  $scope.requestFail = function(response) {
    console.log(response.data);
  };
  $scope.login = function() {
    adminRequests.requestLogin($scope.userdata.username,$scope.userdata.password,$scope.setUserToken,$scope.requestFail);
  };
  $scope.updateMDL = function() {
    componentHandler.upgradeAllRegistered();
  };
  setTimeout(function() {
    $scope.updateMDL();
    $("#loading").hide();
  }, 1000);
}]);
