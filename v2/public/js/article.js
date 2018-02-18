var app = angular.module("app.article",["ngRoute"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/article/:title" , {
    controller: "articleController",
    templateUrl: "/views/templates/article.tpl.html"
  })
}]);

app.service("blogRequests", ["$http", function($http) {
  this.getArticles = function(isSuc,isFail) {
    $http.get("http://localhost:8080/articles").then(isSuc,isFail);
  };
}]);

app.controller("articleController", ["$scope", "blogRequests", "$routeParams", "$anchorScroll", function($scope, blogRequests, $routeParams, $anchorScroll) {
  $scope.gotoElement = function (eID){
    $anchorScroll(eID);
  };
  $scope.logError = function(response) {
    console.log("Fail");
    console.log(response.data);
  };
  $scope.titleId = $routeParams.title;
  blogRequests.getArticles(function(response) {
    var data = response.data;
    for(var i = 0; i < data.length; i++) {
      if(data[i].title == $scope.titleId) {
        $scope.article = data[i];
        break;
      }
    }
  },$scope.logError);
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

app.directive('compile', ['$compile', function ($compile) {
      return function(scope, element, attrs) {
          scope.$watch(
            function(scope) {
               // watch the 'compile' expression for changes
              return scope.$eval(attrs.compile);
            },
            function(value) {
              // when the 'compile' expression changes
              // assign it into the current DOM
              element.html(value);

              // compile the new DOM and link it to the current
              // scope.
              // NOTE: we only compile .childNodes so that
              // we don't get into infinite loop compiling ourselves
              $compile(element.contents())(scope);
            }
        );
    };
}]);
