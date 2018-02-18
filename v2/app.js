var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var path = require("path");
var bcrypt = require("bcrypt");
var config = require("./config.js");
var robots = require('robots.txt');

//model
var User = require("./model.js").User;
var Port = require("./model.js").Port;
var Post = require("./model.js").Post;

//sever setup
var app = express();

//connect to mongoDB
mongoose.connect("mongodb://localhost/blog");

//setup JSON requests
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//setup public facing files
app.use(express.static(path.join(__dirname + "/public")));
app.set("views", __dirname + "/public/views");

//setup view engine
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");
app.use(robots(__dirname + '/public/robots.txt'));

app.get("/", function(req, res) {
  res.render("index.html");
});

app.get("/articles", function(req,res) {
  Post.find({}, function(err,data) {
    if(err) {
      res.status(500).send(err);
    }
    if(data.length) {
      res.status(200).send(data);
    } else {
      res.status(200).send([]);
    }
  });
});

app.get("/portfolio", function(req,res) {
  Port.find({}, function(err,data) {
    if(err) {
      res.status(500).send(err);
    }
    if(data.length) {
      res.status(200).send(data);
    } else {
      res.status(200).send([]);
    }
  });
});

app.get("/admin", function(req,res) {
  res.render("admin.html");
});

app.post("/auth", function(req,res) {
  User.findOne({username: req.body.username}, function(err,user) {
    if(err) {
      res.status(500).send(err);
    }
    if(!user) {
      res.status(200).send({pass: false, message: "Username is not valid"});
    } else if(user) {
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if(result) {
          var token = jwt.sign(user, config.secret, {
            expiresIn: 40 * 60
          });
          res.status(200).json({success: true, token: token});
        } else {
          res.status(200).json({pass: false, message: "Password is not valid"})
        }
      });
    }
  });
});

app.use(function(req,res,next) {
  var token = req.body.token;
  if(token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.status(200).json({ success: false, message: 'Failed to authenticate token' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(400).json({success: false, message: "No token given. This area requires a token to be given to access."});
  }
});

app.post("/article", function(req,res) {
  var pass = true;
  if(!req.body.title) {
    res.status(400).send("No title given in JSON");
    pass = false;
  }
  if(!req.body.auth) {
    res.status(400).send("No author given in JSON");
    pass = false;
  }
  if(!req.body.text) {
    res.status(400).send("No text given in JSON");
    pass = false;
  }
  if(!req.body.postDate) {
    res.status(400).send("No post date given in JSON");
    pass = false;
  }
  if(pass) {
    Post.findOne({title: req.body.title}, function(err,data) {
      if(err) {
        res.status(400).send(err);
      }
      if(data) {
        res.status(200).send("Title Taken");
      } else {
        newPost = new Post(req.body);
        newPost.save(function(err,result) {
          if(err) {
            res.status(400).send(err);
          }
          if(result) {
            res.status(200).send("Success");
          }
        });
      }
    });
  }
});

app.post("/portfolio", function(req,res) {
  var pass = true;
  if(!req.body.name) {
    res.status(400).send("No name given in JSON");
    pass = false;
  }
  if(!req.body.desc) {
    res.status(400).send("No desc given in JSON");
    pass = false;
  }
  if(!req.body.images) {
    res.status(400).send("No images given in JSON");
    pass = false;
  }
  if(!req.body.git) {
    res.status(400).send("No git given in JSON");
    pass = false;
  }
  if(pass) {
    Port.findOne({name: req.body.name}, function(err,data) {
      if(err) {
        res.status(500).send(err);
      }
      if(data) {
        res.status(200).send("Name Taken");
      } else {
        newPort = new Port(req.body);
        newPort.save(function(err,result) {
          if(err) {
            res.status(500).send(err);
          }
          if(result) {
            res.status(200).send("Success");
          }
        });
      }
    });
  }
});

app.post("/deletearticle", function(req,res) {
  var pass = true;
  if(!req.body._id) {
    res.status(400).send("No ID given in JSON");
    pass = false;
  }
  if(pass) {
    Post.findOne({"_id": req.body._id}, function(err,data) {
      if(err) {
        res.status(400).send(err);
      }
      if(data) {
        data.remove();
        data.save();
        res.status(200).send({success: true, message: "Item deleted"});
      }
    });
  }
});

app.post("/deleteportfolio", function(req,res) {
  var pass = true;
  if(!req.body._id) {
    res.status(400).send("No ID given in JSON");
    pass = false;
  }
  if(pass) {
    Port.findOne({"_id": req.body._id}, function(err,data) {
      if(err) {
        res.status(500).send(err);
      }
      if(data) {
        data.remove();
        data.save();
        res.status(200).send({success: true, message: "Item deleted"});
      }
    });
  }
});

app.post("/logs", function(req,res) {
  Log.find({}, function(err,data) {
    if(err) {
      res.status(500).send(err);
    }
    if(data) {
      res.status(200).send(data);
    }
  });
});

app.listen(8080)
