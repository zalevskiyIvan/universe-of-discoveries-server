const config = require("config");
const jwt = require("jsonwebtoken");
//                      AUTH

exports.authController = async (req, res) => {
  const { password } = req.body;
  const correctPassword = config.get("correct_password");
  if (correctPassword === password) {
    const token = jwt.sign({}, config.get("jwt_secret"), { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ token });
  } else res.status(400).json({ message: "uncorrect password" });
};
