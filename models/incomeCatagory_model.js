var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ICatagorySchema = new Schema({
  catagory: String
});

const ICatagory = mongoose.model("IncomeCatagories", ICatagorySchema);
module.exports = ICatagory;
