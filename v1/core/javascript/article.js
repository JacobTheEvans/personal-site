"use strict";
var app = angular.module("mainApp.article",["ngRoute"]);
app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/article/:title" , {
    controller: "articleController",
    templateUrl: "core/templates/article.tpl.html"
  })
}]);

app.controller("articleController", ["$scope", "blogData", "$routeParams", function($scope, blogData, $routeParams) {
  $scope.titleId = $routeParams.title;
  var data = blogData.getData();
  for(var i = 0; i < data.length; i++) {
    if(data[i].title == $scope.titleId) {
      $scope.article = data[i];
      break;
    }
  }
}]);

app.directive('prettyprint', function() {
  var replaceText = function(str) {
      var str1 = String(str);
      return str1.replace(/\n/g,"<br/>");
  }
    return {
        restrict: 'C',
        link: function postLink(scope, element, attrs) {
              element.html(prettyPrintOne(replaceText(element.html()),'',true));
        }
    };
});
