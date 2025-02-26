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

exports.addFlock = async (req, res) => {
  try {
    const { name, owner, series, buemerkeName, buemerkeImage } = req.body;

    if (!name || !owner) {
      return res.status(400).json({ message: "Navn og Eier er påkrevd!" });
    }

    const newFlock = new Flock({
      name,
      owner,
      series,
      buemerkeName,
      buemerkeImage,
    });

    await newFlock.save();
    res.redirect("/database"); // Redirects to database page after adding
  } catch (error) {
    console.error("Error adding flock:", error);
    res.status(500).json({ message: "Failed to add flock" });
  }
};