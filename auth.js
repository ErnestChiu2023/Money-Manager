let express = require("express");
let router = express.Router();
let Users = require("./models/user_model");
let bcrypt = require("bcryptjs");
let config = require("config");
let jwt = require("jsonwebtoken");

//post request to api/auth/
// this route will return the users token if it is correct
router.post("/", function(req, res) {
  const { email, password } = req.body;

  // simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields " });
  }

  // check for existing user
  Users.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    //validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials " });
      }
      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              register_date: user.register_date
            }
          });
        }
      );
    });
  });
});

module.exports = router;
