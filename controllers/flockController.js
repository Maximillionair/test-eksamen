const Flock = require("../models/flockModel");
const Owner = require("../models/ownermodel")

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
    // Get the data from the form
    const { name, ownerName, ownerEmail, series, buemerkeName, buemerkeImage } = req.body;

    if (!name || !ownerName || !ownerEmail) {
      return res.status(400).json({ message: "Flock name, owner name, and owner email are required!" });
    }

    // Find the owner by both name and email
    const ownerDocument = await Owner.findOne({
      name: ownerName,
      email: ownerEmail
    });

    if (!ownerDocument) {
      return res.status(400).json({ message: "Owner with this name and email not found!" });
    }

    // Create a new Flock with only the owner's name (not the full ObjectId or email)
    const newFlock = new Flock({
      name, // Flock name
      owner: ownerName, // Only store the owner's name, not the ObjectId
      series,
      buemerkeName,
      buemerkeImage,
    });

    // Save the new flock to the database
    await newFlock.save();

    // Redirect or return a response after success
    res.redirect("/database"); // Redirects to the database page or another page as needed
  } catch (error) {
    console.error("Error adding flock:", error);
    res.status(500).json({ message: "Failed to add flock" });
  }
};