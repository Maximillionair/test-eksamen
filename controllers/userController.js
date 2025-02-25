const User = require("../models/usermodel");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render("owner", { users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to load users" });
  }
};
