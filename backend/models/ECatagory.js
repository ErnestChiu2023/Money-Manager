var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ECatagorySchema = new Schema({
  catagory: String
});

const ECatagory = mongoose.model("ExpenseCatagories", ECatagorySchema);
module.exports = ECatagory;
