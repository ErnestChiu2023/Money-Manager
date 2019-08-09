var express = require("express");
var router = express.Router();
var income = require("./models/income_model");

// add a new income to the database
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

// get all the income records in the database
router.get("/", function(req, res) {
  income.find({ _id: req.query.id }).then(function(data) {
    res.json(data[0]);
  });
});

// edit a current income record in the database
router.post("/edit/", function(req, res) {
  income
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

// delete a income record in the database by finding the corresponding id
router.delete("/", function(req, res) {
  income.deleteOne(
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
