const Area = require("../models/areaModel");

exports.getAreas = async (req, res) => {
  const areas = await Area.find();
  res.render("map", { areas });
};
