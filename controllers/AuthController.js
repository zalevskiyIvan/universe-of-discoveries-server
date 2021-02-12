const config = require("config");
const jwt = require("jsonwebtoken");
//                      AUTH

exports.authController = async (req, res) => {
  const token = jwt.sign(
    {}, // dont think about this, its dont raise meaning
    config.get("jwt_secret"),
    { expiresIn: "1h" }
  );
  res.status(200).json({ token });
};
