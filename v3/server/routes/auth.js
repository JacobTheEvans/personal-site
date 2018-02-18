let Router = require("express").Router;

//import user model
let User = require("../models/user.js");

//import passport modules
let passport = require("passport");
let Strategy = require("passport-local");

//import auth modules
let jwt = require("jsonwebtoken");

//import config
let settings = require("../config/settings.js");

const authRouter = Router();

passport.use(new Strategy((username, password, done) => {
  User.findOne({
    username: username
  }, (err, user) => {
    if (err) {
      done(null, false);
    } else if (user === null) {
      done(null, false);
    } else {
      user.auth(password, (result) => {
        if (result) {
          done(null, true);
        } else {
          done(null, false);
        }
      });
    }
  });
}));

authRouter.post("/login", passport.initialize(), passport.authenticate("local", {
  session: false,
  scope: []
}), (req, res) => {
  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if (err) {
      res.status(500).send(user);
    } else if (user === null) {
      res.status(400).send({"message": "No user found with this username"});
    } else {
      res.status(201).send({
        "messsage": "Success, Auth token issued",
        "token": jwt.sign(user.toObject(), settings.secret, {
          expiresIn: 30 * 60
        })
      });
    }
  });
});

module.exports = authRouter;
