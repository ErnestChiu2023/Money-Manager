var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var expense = require("./expense");
var income = require("./income");

app.use(bodyParser.json());
app.use("/expense", expense);
app.use("/income", income);

let expenseModel = require("./models/expenses");
let incomeModel = require("./models/incomes");

mongoose.connect("mongodb://localhost/moneyManager");
mongoose.connection
  .once("open", function() {
    console.log("successfully connected to the database");
  })
  .on("error", function(error) {
    console.log("Connectin error:", error);
  });

app.get("/records", function(req, res) {
  let count = 0;
  var Records = {
    expenses: null,
    incomes: null
  };
  function callback() {
    if (++count == 2) {
      res.json(Records);
    }
  }
  expenseModel.find({}).then(function(data) {
    Records.expenses = data;
    callback();
  });
  incomeModel.find({}).then(function(data) {
    Records.incomes = data;
    callback();
  });
});

app.listen(4000, function() {
  console.log("Now listening on port 4000");
});
