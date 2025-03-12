const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "Admin") return res.status(403).json({ message: "Access denied" });
  next();
};

const moderatorOnly = (req, res, next) => {
  if (!["Admin", "Moderator"].includes(req.user.role)) return res.status(403).json({ message: "Access denied" });
  next();
};

module.exports = { protect, adminOnly, moderatorOnly };
