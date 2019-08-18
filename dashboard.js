var express = require("express");
var router = express.Router();
var expense = require("./models/expense_model");
var income = require("./models/income_model");
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var current_mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();
today = yyyy + "-" + current_mm + "-" + dd;
last_month = yyyy + "-" + current_mm + "-" + "01";
today = new Date("<" + today + ">").toISOString();
last_month = new Date("<" + last_month + ">").toISOString();

/* 
  this function returns all the information that is required for the dashboard page 
  - Total Income
  - Total Expense
  - Total Balance
  - Expense Statistics by Dates
  - Expense Statistics by Catagory
  - highest expense records of the month
*/
router.get("/", function(req, res) {
  // counts the number of calculations that finished
  var count = 0;
  // returns these values
  var Values = {
    expense_sum: 0,
    incomes_sum: 0,
    balance: 0,
    catagory_expenses: [],
    time_expenses: [],
    top_expenses: []
  };
  // calls the callback function after every promise
  function callback() {
    if (++count == 5) {
      Values.balance = Values.incomes_sum - Values.expense_sum;
      res.json(Values);
    }
  }

  // finds the total income
  income
    .find({
      UserID: req.query.UserID,
      date: {
        $gte: last_month,
        $lte: today
      }
    })
    .then(function(data) {
      console.log(data);
      for (record in data) {
        Values.incomes_sum += data[record].amount;
      }
      callback();
    });

  // finds the total expense
  expense
    .find({
      UserID: req.query.UserID,
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

  // aggregates the total expense of the month and groups by catagory
  expense
    .aggregate([
      {
        $match: {
          UserID: req.query.UserID,
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

  // aggregates the total expense of the month and groups by day of month
  expense
    .aggregate([
      {
        $match: {
          UserID: req.query.UserID,
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

  // calculates the top 5 expenses of the month
  expense
    .find({
      UserID: req.query.UserID,
      date: {
        $gte: last_month,
        $lte: today
      }
    })
    .sort({ amount: -1 })
    .limit(5)
    .then(function(data) {
      Values.top_expenses = data;
      callback();
      console.log(data);
    });
});

module.exports = router;
