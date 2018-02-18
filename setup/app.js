var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var User = require("./model.js").User;
var Token = require("./model.js").Token;
var Post = require("./model.js").Post;

mongoose.connect("mongodb://localhost/blog");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + "/public")));
app.set("views", __dirname + "/public/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.post('/setup', function(req, res) {
  if(req.body.username && req.body.password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    var  newuser = new User({
      username: req.body.username,
      password: hash
    });
  } else{
    res.status(200).send({success: false, message: "Need username and password"});
  }
  newuser.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully');
    res.status(200).send({ success: true });
  });
});

app.get("/users", function(req,res) {
  User.find({}, function(err,users) {
    res.status(200).send(users);
  });
});

app.listen(8080);
