let express = require("express");
let router = express.Router();
let Users = require("./models/Users");

router.post("/", function(req, res) {
  res.json({ msg: "hello" });
});

module.exports = router;
