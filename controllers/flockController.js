const Flock = require("../models/flockModel");

exports.getFlocks = async (req, res) => {
  const flocks = await Flock.find().populate("owner", "name");
  res.render("flock", { flocks });
};
