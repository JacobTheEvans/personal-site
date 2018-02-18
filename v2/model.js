var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});


var postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  auth: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  postDate: {
    type: String,
    required: true
  },
});

var portSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  git: {
    type: String,
    required: true
  },
});

var logSchema = new Schema({
  ip: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = {
  User: mongoose.model("user", userSchema),
  Post: mongoose.model("post", postSchema),
  Port: mongoose.model("port", portSchema),
  Log: mongoose.model("log", logSchema)
};
