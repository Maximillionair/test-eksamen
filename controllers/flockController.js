const Flock = require("../models/flockModel");

exports.getFlocks = async (req, res) => {
  try {
    const flocks = await Flock.find().populate("owner", "name");
    res.render("flock", { flocks });
  } catch (error) {
    console.error("Error fetching flocks:", error);
    res.status(500).json({ message: "Failed to load flocks" });
  }
};

