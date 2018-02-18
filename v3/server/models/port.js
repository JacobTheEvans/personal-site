let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let portSchema = new Schema({
  name: {
    type: "String",
    required: true
  },
  desc: {
    type: "String",
    required: true
  },
  img: {
    type: "String",
    required: true
  },
  url: {
    type: "String",
    required: true
  }
});

module.exports = mongoose.model("port", portSchema);
