let express = require("express");
let router = express.Router();
let Users = require("./models/user_model");
let bcrypt = require("bcryptjs");

router.post("/", function(req, res) {
  const { name, email, password } = req.body;

  // simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields " });
  }

  // check for existing user
  Users.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new Users({
      name,
      email,
      password
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          res.json({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              register_date: user.register_date
            }
          });
        });
      });
    });
  });
});

module.exports = router;
