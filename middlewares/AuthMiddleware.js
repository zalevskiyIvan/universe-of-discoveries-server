const jwt = require("jsonwebtoken");
const config = require("config");

exports.AuthMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") next();

  try {
    const token = req.cookies.token;

    if (!token) return res.status(403).json({ message: "re-authorization" });

    const decoded = jwt.verify(token, config.get("jwt_secret"));
    if (!decoded) return res.status(403).json({ message: "re-authorization" });
    next();
  } catch (e) {
    res.status(403).json({ message: "re-authorization" });
  }
};
