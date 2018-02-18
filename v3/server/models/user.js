let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let salt = bcrypt.genSaltSync(10);
let Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: "String",
    unique: true,
    required: true
  },
  password: {
    type: "String",
    required: true
  },
});

userSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, salt)
  next();
});

userSchema.methods.auth = function(passwordAttempt, cb) {
  bcrypt.compare(passwordAttempt, this.password, (err, result) => {
    if(err) {
      console.log(err);
      cb(false);
    } else if(result) {
      cb(true);
    } else {
      cb(false);
    }
  });
};

module.exports = mongoose.model("user", userSchema);
