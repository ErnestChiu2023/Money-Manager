var express = require("express");
var router = express.Router();
const ECatagory = require("./models/ECatagory");

router.post("/", function(req, res) {
  var record = new ECatagory({
    catagory: req.body.catagory
  });
  record.save();
  res.send("saved");
});

router.get("/", function(req, res) {
  ECatagory.find({}).then(function(data) {
    res.json(data);
  });
});

module.exports = router;
