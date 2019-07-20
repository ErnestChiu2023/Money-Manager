var express = require("express");
var router = express.Router();
var expense = require("./models/expenses");
var income = require("./models/incomes");
var ECatagory = require("./models/ECatagory");

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var current_mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();
today = yyyy + "-" + current_mm + "-" + dd;
last_month = yyyy + "-" + current_mm + "-" + "01";
today = new Date("<" + today + ">").toISOString();
last_month = new Date("<" + last_month + ">").toISOString();

router.get("/", function(req, res) {
  var count = 0;
  var Values = {
    expense_sum: 0,
    incomes_sum: 0,
    balance: 0,
    catagory_expenses: [],
    time_expenses: []
  };
  function callback() {
    if (++count == 4) {
      Values.balance = Values.incomes_sum - Values.expense_sum;
      res.json(Values);
    }
  }
  income
    .find({
      date: {
        $gte: last_month,
        $lte: today
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
        $gte: last_month,
        $lte: today
      }
    })
    .then(function(data) {
      for (record in data) {
        Values.expense_sum += data[record].amount;
      }
      callback();
    });

  expense
    .aggregate([
      {
        $match: {
          date: {
            $gte: new Date("<" + yyyy + "-" + current_mm + "-01>"),
            $lte: new Date("<" + yyyy + "-" + current_mm + "-" + dd + ">")
          }
        }
      },
      {
        $group: {
          _id: "$catagory",
          total: { $sum: "$amount" }
        }
      }
    ])
    .then(function(data) {
      Values.catagory_expenses = data;
      callback();
    });
  expense
    .aggregate([
      {
        $match: {
          date: {
            $gte: new Date("<" + yyyy + "-" + current_mm + "-01>"),
            $lte: new Date("<" + yyyy + "-" + current_mm + "-" + dd + ">")
          }
        }
      },
      {
        $group: {
          _id: { $dayOfMonth: "$date" },
          total: { $sum: "$amount" }
        }
      }
    ])
    .then(function(data) {
      console.log(data);
      Values.time_expenses = data;
      callback();
    });
});

module.exports = router;
