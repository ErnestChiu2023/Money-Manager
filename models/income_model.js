var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const incomeSchema = Schema({
  catagory: String,
  amount: Number,
  date: Date
});

const income = mongoose.model("income", incomeSchema);
module.exports = income;
