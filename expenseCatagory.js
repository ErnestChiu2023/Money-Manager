var express = require("express");
var router = express.Router();
const ECatagory = require("./models/expenseCatagory_model");

// save a new catagory to the collection
router.post("/", function(req, res) {
  var record = new ECatagory({
    UserID: req.body.UserID,
    catagory: req.body.catagory
  });
  record.save();
  res.send("saved");
});

// get all of the catagories and return the json
router.get("/", function(req, res) {
  ECatagory.find({ UserID: req.query.UserID }).then(function(data) {
    res.json(data);
  });
});

// delete the selected catagory by finding the corresponding id
router.delete("/", function(req, res) {
  ECatagory.deleteOne(
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
