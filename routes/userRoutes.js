const express = require("express");
const { getUsers, getUserProfile } = require("../controllers/userController");
const { protect, adminOnly, moderatorOnly } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/get-users", protect, moderatorOnly, getUsers);
router.get("/user-profile", protect, getUserProfile);

module.exports = router;
