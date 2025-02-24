const User = require("../models/usermodel");

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.render("owner", { users });
};
