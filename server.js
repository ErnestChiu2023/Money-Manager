const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 80;

app.use(bodyParser.json());

var expense = require("./expense");
var income = require("./income");
var dashboard = require("./dashboard");
var IncomeCatagory = require("./IncomeCatagory");
var expenseCatagory = require("./expenseCatagory");
let expenseModel = require("./models/expenses");
let incomeModel = require("./models/incomes");

app.use("/expense", expense);
app.use("/income", income);
app.use("/incomeCatagory", IncomeCatagory);
app.use("/expenseCatagory", expenseCatagory);
app.use("/dashboard", dashboard);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/moneyManager",
  { useNewUrlParser: true }
);
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../money_manager/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "money_manager", "build", "index.html")); //relative path
  });
}

app.listen(PORT, function() {
  console.log("Now listening to a port");
});
