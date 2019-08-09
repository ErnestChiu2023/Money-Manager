const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: String,
  password: String,
  register_date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("Users", UserSchema);
module.exports = User;
