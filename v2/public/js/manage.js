var app = angular.module("app.manage",["ngRoute","ngCookies"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/manage", {
    templateUrl: "/views/templates/manage.tpl.html",
    controller: "manageController"
  })
}]);

app.controller("manageController", ["$scope", "adminRequests", "$cookies", "storageJSON", function($scope, adminRequests, $cookies, storageJSON) {
  storageJSON.saveJSON({});
  $scope.navLocal = "Blog";
  $scope.setNavLocal = function(local) {
    $scope.searchText = "";
    $scope.navLocal = local;
  };
  $scope.userdata = {};
  $scope.redirect = function() {
    window.location.href = "/#/home";
  };
  $scope.requestFail = function(response) {
    console.log(response.data);
  };
  $scope.suc = function(response) {
    $scope.loadData();
  }
  $scope.setPosts = function(response) {
    var data = response.data;
    var result = [];
    for(var i = 0; i < data.length; i++) {
      var date = new Date(data[i].postDate);
      var temp = data[i];
      temp.postDate = date;
      result.push(temp);
    }
    $scope.posts = result;
  };
  $scope.setPorts = function(response) {
    $scope.ports = response.data;
  };
  $scope.formatDate = function(date) {
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    if(date.getHours() > 12) {
      var hours = date.getHours() % 12;
      var inc = "PM";
    } else {
      var hours = date.getHours();
      var inc = "AM"
    }
    return months[date.getMonth()] + " " + date.getDate() + ", " + hours + ":" + date.getMinutes() + " " + inc;
  };
  $scope.formatDisplayDate = function(date) {
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return months[date.getMonth()] + " " + date.getDate();
  };
  $scope.loadData = function() {
    adminRequests.getArictles($scope.setPosts,$scope.requestFail);
    adminRequests.getPorts($scope.setPorts,$scope.requestFail);
  };
  $scope.deletePost = function(post) {
    adminRequests.deletePost($cookies.get("UserToken"),post._id,$scope.suc,$scope.requestFail);
  };
  $scope.deletePort = function(port) {
    adminRequests.deletePort($cookies.get("UserToken"),port._id,$scope.suc,$scope.requestFail);
  };
  $scope.loadLogs = function() {
    adminRequests.getLogs($cookies.get("UserToken"),$scope.setLogs,$scope.requestFail);
  };
  $scope.updateMDL = function() {
    componentHandler.upgradeAllRegistered();
  };
  setTimeout(function() {
    $scope.updateMDL();
    $("#loading").hide();
  }, 1000);
}]);
