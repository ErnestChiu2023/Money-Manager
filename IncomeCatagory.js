var express = require("express");
var router = express.Router();
const ICatagory = require("./models/ICatagory");

router.post("/", function(req, res) {
  var record = new ICatagory({
    catagory: req.body.catagory
  });
  record.save();
  res.send("saved");
});

router.get("/", function(req, res) {
  ICatagory.find({}).then(function(data) {
    res.json(data);
  });
});

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
