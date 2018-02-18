app.service("storageJSON",[function() {
  var data = {};
  this.saveJSON = function(object) {
    data = object;
  };
  this.loadJSON = function() {
    return data;
  };
}]);
