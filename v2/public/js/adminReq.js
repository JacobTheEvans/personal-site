app.service("adminRequests", ["$http", function($http) {
  this.requestLogin = function(username,password,isSuc,isFail) {
    var data = {
      username: username,
      password: password
    }
    $http.post("http://localhost:8080/auth",data).then(isSuc,isFail)
  };
  this.requestNewPost = function(token,title,auth,text,postDate,isSuc,isFail) {
    var data = {
      token: token,
      title: title,
      auth: auth,
      text: text,
      postDate: postDate
    }
    $http.post("http://localhost:8080/article",data).then(isSuc,isFail)
  };
  this.requestNewPort = function(token,name,desc,images,git,isSuc,isFail) {
    var data = {
      token: token,
      name: name,
      desc: desc,
      images: images,
      git: git
    }
    $http.post("http://localhost:8080/portfolio",data).then(isSuc,isFail)
  };
  this.getArictles = function(isSuc,isFail) {
    $http.get("http://localhost:8080/articles").then(isSuc,isFail);
  };
  this.getPorts = function(isSuc,isFail) {
    $http.get("http://localhost:8080/portfolio").then(isSuc,isFail);
  };
  this.deletePost = function(token,_id,isSuc,isFail) {
    var data = {
      token: token,
      _id: _id
    };
    $http.post("http://localhost:8080/deletearticle",data).then(isSuc,isFail);
  };
  this.deletePort = function(token,_id,isSuc,isFail) {
    var data = {
      token: token,
      _id: _id
    };
    $http.post("http://localhost:8080/deleteportfolio",data).then(isSuc,isFail);
  };
  this.getLogs = function(token,isSuc,isFail) {
    var data = {
      token: token
    }
    $http.post("http://localhost:8080/logs",data).then(isSuc,isFail);
  };
}]);
