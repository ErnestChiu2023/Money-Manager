var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var expense = require("./expense");
var income = require("./income");

app.use(bodyParser.json());
app.use("/expense", expense);
app.use("/income", income);

mongoose.connect("mongodb://localhost/moneyManager");
mongoose.connection
  .once("open", function() {
    console.log("successfully connected to the database");
  })
  .on("error", function(error) {
    console.log("Connectin error:", error);
  });

app.get("/", function(req, res) {
  res.send("hello world");
});

app.listen(3000, function() {
  console.log("Now listening on port 3000");
});
