var express = require("express");
var router = express.Router();
var expense = require("./models/expenses");
var income = require("./models/incomes");

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var current_mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();
today = yyyy + "-" + current_mm + "-" + dd;
last_month = yyyy + "-" + current_mm + "-" + "01";

router.get("/", function(req, res) {
  console.log("<" + last_month + ">");
  console.log(new Date("<" + last_month + ">").toISOString());
  var count = 0;
  var Values = {
    expense_sum: 0,
    incomes_sum: 0,
    balance: 0
  };
  function callback() {
    if (++count == 2) {
      Values.balance = Values.incomes_sum - Values.expense_sum;
      res.json(Values);
    }
  }
  income
    .find({
      date: {
        $gte: new Date("<" + last_month + ">").toISOString(),
        $lte: new Date("<" + today + ">").toISOString()
      }
    })
    .then(function(data) {
      for (record in data) {
        Values.incomes_sum += data[record].amount;
      }
      callback();
    });
  expense
    .find({
      date: {
        $gte: new Date("<" + last_month + ">").toISOString(),
        $lte: new Date("<" + today + ">").toISOString()
      }
    })
    .then(function(data) {
      for (record in data) {
        Values.expense_sum += data[record].amount;
      }
      callback();
    });
});

module.exports = router;
