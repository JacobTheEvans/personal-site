var app = angular.module("app.preview",["ngRoute","ngCookies"]);

app.config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/preview/:type", {
    templateUrl: "/views/templates/preview.tpl.html",
    controller: "previewController"
  })
}]);

app.controller("previewController", ["$scope", "$timeout", "adminRequests", "$cookies", "$routeParams", "storageJSON", "$sce", function($scope, $timeout, adminRequests, $cookies, $routeParams, storageJSON ,$sce) {
  $scope.type = $routeParams.type;
  $scope.modalShown = false;
  $scope.trust = $sce.trustAsHtml;
  $scope.currentImageIndex = 0;
  $scope.redirect = function() {
    window.location.href = "/#/home";
  };
  $scope.load = function() {
    if($scope.type == "Blog") {
      $scope.article = storageJSON.loadJSON();
    } else {
      $scope.currentProject = [storageJSON.loadJSON()][0];
      $scope.currentProject.images = storageJSON.loadJSON().images.split(",");
    }
  };
  $scope.setProject = function(project) {
    $scope.currentProject = project;
    $scope.currentImageIndex = 0;
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
  $scope.logSuc = function(response) {
    window.location.href = "/admin/#/manage";
  }
  $scope.logFail = function(response) {
    console.log(response.data);
  }
  $scope.submit = function() {
    if($scope.type == "Blog") {
      adminRequests.requestNewPost($cookies.get("UserToken"),$scope.article.title,$scope.article.auth,$scope.article.text,$scope.article.postDate,$scope.logSuc,$scope.logFail);
    } else if($scope.type == "Portfolio") {
      adminRequests.requestNewPort($cookies.get("UserToken"),$scope.currentProject.name,$scope.currentProject.desc,$scope.currentProject.images,$scope.currentProject.git,$scope.logSuc,$scope.logFail);
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
