const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // check for the token
  if (!token) {
    res.status(401).json({ msg: "No token, authorization denied " });
  }

  try {
    //verify the token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // add user from payload
    // so that the request will have the corresponding user
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid " });
  }
}

module.exports = auth;
