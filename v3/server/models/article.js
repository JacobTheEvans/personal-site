let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let articleSchema = new Schema({
  title: {
    type: "String",
    required: true
  },
  date: {
    type: "String",
    required: true
  },
  text: {
    type: "String",
    required: true
  }
});

module.exports = mongoose.model("article", articleSchema);
