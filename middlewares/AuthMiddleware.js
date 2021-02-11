const jwt = require("jsonwebtoken");
const config = require("config");

exports.AuthMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") next();

  try {
    const token = req.get("Authorization").split(" ")[1];
    if (!token) return res.status(500).json({ message: "re-authorization" });

    const decoded = jwt.verify(token, config.get("jwt_secret"));
    if (!decoded) return res.status(500).json({ message: "re-authorization" });
  } catch (e) {
    res.status(500).json({ message: "re-authorization" });
  }
  next();
};
