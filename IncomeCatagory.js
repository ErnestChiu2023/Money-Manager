var express = require("express");
var router = express.Router();
const ICatagory = require("./models/incomeCatagory_model");

// add a new income catagory to the database
router.post("/", function(req, res) {
  var record = new ICatagory({
    UserID: req.body.UserID,
    catagory: req.body.catagory
  });
  record.save();
  res.send("saved");
});

// receive all the catagories from the database
// that match the query userid
router.get("/", function(req, res) {
  ICatagory.find({ UserID: req.query.UserID }).then(function(data) {
    res.json(data);
  });
});

// delete the corresponding matching id catagory in the database
router.delete("/", function(req, res) {
  ICatagory.deleteOne(
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
