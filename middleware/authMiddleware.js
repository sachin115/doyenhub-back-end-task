const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    console.log("Received Token:", token); // Debugging log

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    token = token.split(" ")[1]; // Extract actual token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

const moderatorOnly = (req, res, next) => {
  if (!req.user || !["Admin", "Moderator"].includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = { protect, adminOnly, moderatorOnly };
