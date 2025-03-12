const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true, minlength: 8 },
  role: { type: String, enum: ["Admin", "User", "Moderator"], default: "User" },
});

module.exports = mongoose.model("User", UserSchema);
