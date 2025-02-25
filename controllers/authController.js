const Owner = require("../models/ownermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerOwner = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingOwner = await Owner.findOne({ email });
    if (existingOwner) {
      return res.status(400).json({ message: "Email is already taken" });
    }
    const owner = new Owner({ name, email, password });
    await owner.save();
    res.redirect("/login");
  } catch (error) {
    res.status(500).json({ message: "Registrering feilet: " + error.message });
  }
};

exports.loginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;
    const owner = await Owner.findOne({ email });
    if (!owner || !(await bcrypt.compare(password, owner.password))) {
      return res.status(401).json({ message: "Feil innlogging" });
    }
    const token = jwt.sign({ id: owner._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Login error" });
  }
};
