const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "❌ Access denied" });

  try {
    const decoded = jwt.verify(token, "yourSecretKey"); // Replace with env var in production
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "❌ Invalid token" });
  }
};

module.exports = authMiddleware;
