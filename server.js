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
var users = require("./user");
var IncomeCatagory = require("./incomeCatagory");
var expenseCatagory = require("./expenseCatagory");

// using the correct routes
app.use("/api/expense", expense);
app.use("/api/income", income);
app.use("/api/incomeCatagory", IncomeCatagory);
app.use("/api/expenseCatagory", expenseCatagory);
app.use("/api/dashboard", dashboard);
app.use("/api/users", users);

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
