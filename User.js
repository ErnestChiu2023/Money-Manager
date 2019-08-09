let express = require("express");
let router = express.Router();
let Users = require("./models/user_model");

router.post("/", function(req, res) {
  res.json({ msg: "hello" });
});

module.exports = router;
