var express = require("express");
var router = express.Router();
var income = require("./models/incomes");

router.post("/", function(req, res) {
  var transaction = new income({
    catagory: req.body.catagory,
    amount: req.body.amount,
    date: new Date("<" + req.body.date + ">")
  });
  console.log("<" + req.body.date + ">");
  transaction.save();
  res.send("saved");
});

module.exports = router;
