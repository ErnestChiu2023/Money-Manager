const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
// listens to the environment port or port 80
const PORT = process.env.PORT || 80;
// use body parser to parse the json
app.use(bodyParser.json());

// requiring the correct data models and collections
var expense = require("./expense");
var income = require("./income");
var dashboard = require("./dashboard");
var IncomeCatagory = require("./IncomeCatagory");
var expenseCatagory = require("./expenseCatagory");
let expenseModel = require("./models/expenses");
let incomeModel = require("./models/incomes");

// using the correct routes
app.use("/api/expense", expense);
app.use("/api/income", income);
app.use("/api/incomeCatagory", IncomeCatagory);
app.use("/api/expenseCatagory", expenseCatagory);
app.use("/api/dashboard", dashboard);

// connect to the mongodb database
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/moneyManager",
  { useNewUrlParser: true }
);

// open the mongodb connection
mongoose.connection
  .once("open", function() {
    console.log("successfully connected to the database");
  })
  .on("error", function(error) {
    console.log("Connectin error:", error);
  });

// default api for all records
// TODO: Check where this is used and remove if unecessary
app.get("/api/records", function(req, res) {
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

// use front end in the build folder if the process and variable is in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("money_manager/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "money_manager", "build", "index.html")); //relative path
  });
}

// listen to the correct port
app.listen(PORT, function() {
  console.log("Now listening to a port" + process.env.PORT);
});
