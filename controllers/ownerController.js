const Owner = require("../models/ownermodel");

exports.getOwners = async (req, res) => {
  try {
    const owners = await Owner.find();
    res.render("owner", { owners });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to load users" });
  }
};
