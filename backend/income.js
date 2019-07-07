var express = require("express");
var router = express.Router();
var income = require("./models/incomes");

router.post("/", function(req, res) {
  var transaction = new income({
    catagory: req.body.catagory,
    amount: req.body.amount,
    date: new Date(req.body.date + "T" + req.body.time + ":00")
  });
  console.log(req.body.date + "T" + req.body.time + ":00");
  transaction.save();
  res.send("saved");
});

module.exports = router;
