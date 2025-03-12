const User = require("../models/User");

// Get Users (Admin & Moderator)
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = search ? { _id: search } : {};
    const users = await User.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await User.countDocuments(query);
    res.json({ users, totalPages: Math.ceil(count / limit), currentPage: page });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Profile (User)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUsers, getUserProfile };
