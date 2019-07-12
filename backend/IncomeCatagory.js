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

module.exports = router;
