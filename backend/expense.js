var express = require("express");
var router = express.Router();
const expense = require("./models/expenses");

router.post("/", function(req, res) {
  var transaction = new expense({
    catagory: req.body.catagory,
    amount: req.body.amount,
    date: new Date(req.body.date + "T" + req.body.time + ":00")
  });
  transaction.save();
  res.send("saved");
});

module.exports = router;
