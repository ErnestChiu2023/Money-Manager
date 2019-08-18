const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Scehma and Model
const expenseSchema = new Schema({
  UserID: String,
  catagory: String,
  amount: Number,
  date: Date
});

const expense = mongoose.model("expense", expenseSchema);
module.exports = expense;
