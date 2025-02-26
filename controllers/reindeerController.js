const Reindeer = require("../models/reindeerModel");
const Owner = require("../models/ownermodel");
const mongoose = require("mongoose");

// Funksjon for å søke etter reinsdyr
const searchReindeer = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ success: false, message: "Query is required" });
    }

    let searchConditions = [{ name: { $regex: query, $options: 'i' } }];
    if (mongoose.Types.ObjectId.isValid(query)) {
      searchConditions.push({ _id: query });
    }

    const results = await Reindeer.find({ $or: searchConditions });
    res.json({ success: true, data: results });
  } catch (error) {
    console.error("Error searching for reindeer:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Funksjon for å legge til et nytt reinsdyr
const addReindeer = async (req, res) => {
  try {
    const { serialNumber, name, age, ownerName, ownerEmail } = req.body;

    // Validate required fields
    if (!serialNumber || !name || !age || !ownerName || !ownerEmail) {
      return res.status(400).json({ success: false, message: "Alle feltene må fylles ut!" });
    }

    // Find the owner by name and email
    const ownerData = await Owner.findOne({ name: ownerName, email: ownerEmail });
    if (!ownerData) {
      return res.status(404).json({ success: false, message: "Eier ikke funnet!" });
    }

    // Retrieve flock associated with the owner
    const flockId = ownerData.flock;

    // Create new reindeer
    const newReindeer = new Reindeer({
      serialNumber,
      name,
      flock: flockId,
      age,
      owner: ownerName, // Store the owner's name instead of ObjectId
    });

    await newReindeer.save();
    // alert("Reinsdyr registrert: ",newReindeer);
    res.redirect("/database");
  } catch (error) {
    console.error("Error adding reindeer:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { searchReindeer, addReindeer };



