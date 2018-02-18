"use strict";
var app = angular.module("mainApp.blog",["ngRoute"]);
app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/blog" , {
    controller: "blogController",
    templateUrl: "core/templates/blog.tpl.html"
  })
}]);

app.service("getArticleService",["$http", function($http) {
  this.getArticle = function(url,isSuc,isFail) {
    $http.get(url).then(isSuc,isFail);
  };
}]);

app.controller("blogController", ["$scope", "$location", "anchorSmoothScroll", "blogData", "getArticleService", "$sce", function($scope, $location, anchorSmoothScroll, blogData, getArticleService, $sce) {
  $scope.articles = [];
  $scope.gotoElement = function (eID){
    $location.hash('bottom');
    anchorSmoothScroll.scrollTo(eID);
  };
  $scope.loadPosts = function() {
    $scope.posts = blogData.getData();
  };
  $scope.setArticle = function(response) {
    var index = response.data.indexOf("</p>");
    var data = response.data.slice(0,index+3) + "<p>...</p>";
    $scope.articles.push($sce.trustAsHtml(data));
  };
  $scope.logError = function(response) {
    console.log(response)
  }
  $scope.getArticle = function($index) {
    $scope.currentIndex = $index;
    getArticleService.getArticle($scope.posts[$index].url,$scope.setArticle,$scope.logError);
  };
}]);
