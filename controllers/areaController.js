const Area = require("../models/areaModel");

exports.getAreas = async (req, res) => {
  try {
    const areas = await Area.find();
    res.render("map", { areas });
  } catch (error) {
    console.error("Error fetching areas:", error);
    res.status(500).json({ message: "Failed to load areas" });
  }
};
