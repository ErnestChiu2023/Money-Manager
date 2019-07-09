const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PORT = 80;

app.use(bodyParser.json());

var expense = require("./expense");
var income = require("./income");
let expenseModel = require("./models/expenses");
let incomeModel = require("./models/incomes");

app.use("/expense", expense);
app.use("/income", income);

mongoose.connect("mongodb://localhost/moneyManager", { useNewUrlParser: true });
mongoose.connection
  .once("open", function() {
    console.log("successfully connected to the database");
  })
  .on("error", function(error) {
    console.log("Connectin error:", error);
  });

app.get("/records", cors(), function(req, res) {
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

app.listen(PORT, function() {
  console.log("Now listening on port 4000");
});
