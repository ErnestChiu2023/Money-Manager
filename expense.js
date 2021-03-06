var express = require("express");
var router = express.Router();
var expense = require("./models/expense_model");
var auth = require("./middleware/auth_middleware");

// post request to save a new expense
router.post("/", function(req, res) {
  console.log(req.body.date);
  var transaction = new expense({
    catagory: req.body.catagory,
    amount: req.body.amount,
    date: new Date("<" + req.body.date + ">"),
    UserID: req.body.UserID
  });
  transaction.save();
  res.send("saved");
});

// get the selected expense record
router.get("/", function(req, res) {
  expense.find({ _id: req.query.id }).then(function(data) {
    res.json(data[0]);
  });
});

// grabs all the expenses that have the matching userID
router.get("/all", function(req, res) {
  expense.find({ UserID: req.query.UserID }).then(function(data) {
    res.json(data);
  });
});

// edit the expense records by reading the request variable
router.post("/edit/", function(req, res) {
  expense
    .updateOne(
      { _id: req.query.id },
      {
        $set: {
          catagory: req.body.catagory,
          amount: req.body.amount,
          date: req.body.date
        }
      }
    )
    .then(console.log("upated"));
  res.send("updated");
});

// delete the selected expense record by query id
router.delete("/", function(req, res) {
  expense.deleteOne(
    {
      _id: req.query.id
    },
    function(err) {
      if (err) {
        console.log("error");
      } else {
        console.log("deleted");
      }
    }
  );
  res.send("deleted");
});

module.exports = router;
