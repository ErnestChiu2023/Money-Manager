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

module.exports = router;
