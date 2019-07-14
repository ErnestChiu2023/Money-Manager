var express = require("express");
var router = express.Router();
const expense = require("./models/expenses");

router.post("/", function(req, res) {
  var transaction = new expense({
    catagory: req.body.catagory,
    amount: req.body.amount,
    date: new Date("<" + req.body.date + ">")
  });
  transaction.save();
  res.send("saved");
});

router.get("/", function(req, res) {
  expense.find({ _id: req.query.id }).then(function(data) {
    res.json(data[0]);
  });
});

module.exports = router;
