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
  var income_sum = 0;
  income
    .find({
      date: {
        $gte: new Date("<" + last_month + ">").toISOString(),
        $lte: new Date("<" + today + ">").toISOString()
      }
    })
    .then(function(data) {
      for (record in data) {
        income_sum += data[record].amount;
      }
      res.json(income_sum);
    });
});

module.exports = router;
