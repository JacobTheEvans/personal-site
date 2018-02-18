var app = angular.module("app.blog",["ngRoute"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/blog", {
    templateUrl: "/views/templates/blog.tpl.html",
    controller: "blogController"
  })
}]);

app.service("blogRequests", ["$http", function($http) {
  this.getArticles = function(isSuc,isFail) {
    $http.get("http://localhost:8080/articles").then(isSuc,isFail);
  };
}]);

app.controller("blogController", ["$scope", "blogRequests", "$sce", function($scope,blogRequests,$sce) {
  $scope.articles = {};
  $scope.gotoElement = function (eID){
    $anchorScroll(eID);
  };
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
  $scope.logError = function() {
    console.log(response.data);
  };
  $scope.loadPosts = function() {
    blogRequests.getArticles($scope.setPosts,$scope.logError);
  };
  $scope.setArticle = function(name,data) {
    var index = data.indexOf("</p>");
    var data = data.slice(0,index+3) + "<p>...</p>";
    $scope.articles[name] = ($sce.trustAsHtml(data));
  };
  $scope.logError = function(response) {
    console.log(response)
  };
  $scope.getArticle = function($index) {
    $scope.setArticle($scope.posts[$index].title ,$scope.posts[$index].text);
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
