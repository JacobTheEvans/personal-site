let readlineSync = require("readline-sync");
let User = require("../models/user.js");
let Article = require("../models/article.js");
let Port = require("../models/port.js");
let mongoose = require("mongoose");
let settings = require("../config/settings.js");

mongoose.connect("mongodb://localhost/" + settings.db);

let setup = (cb) => {
  console.log("[+] Starting init auth");
  let username = "";
  let password = "";
  let confirmPassword = "";
  while (username === "") {
    username = readlineSync.question("Username: ");
  }
  while (password === "" || confirmPassword === "" || password != confirmPassword) {
    password = readlineSync.question("Password: ", {hideEchoBack: true});
    confirmPassword = readlineSync.question("Confirm Password: ", {hideEchoBack: true});
  }
  let newUser = new User({username, password});
  newUser.save((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("[+] Success user saved");
    }
    let newPort = new Port({name: "temp", desc: "temp", img: "temp", url: "temp"});
    newPort.save((err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("[+] Port saved");
      }
    });
    let newArticle = new Article({title: "null", date: "null", text: "null"});
    newArticle.save((err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("[+] Article saved");
      }
    });});
}

setup();
