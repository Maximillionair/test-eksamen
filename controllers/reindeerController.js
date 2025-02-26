const Reindeer = require("../models/reindeerModel");
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
    const { serialNumber, name, age, owner } = req.body;

    // Validate required fields
    if (!serialNumber || !name || !age || !owner) {
      return res.status(400).json({ success: false, message: "Alle feltene må fylles ut!" });
    }

    // Convert owner to ObjectId if valid
    const ownerId = mongoose.Types.ObjectId.isValid(owner) ? new mongoose.Types.ObjectId(owner) : null;
    if (!ownerId) {
      return res.status(400).json({ success: false, message: "Ugyldig eier-ID!" });
    }

    // Find the owner to get their flock
    const ownerData = await Owner.findById(ownerId);
    if (!ownerData) {
      return res.status(404).json({ success: false, message: "Eier ikke funnet!" });
    }

    const flockId = ownerData.flock; // Assuming Owner model has a "flock" field

    // Create new reindeer with the flock ID from owner
    const newReindeer = new Reindeer({
      serialNumber,
      name,
      flock: flockId, // Automatically assigned from owner
      age,
      owner: ownerId,
    });

    await newReindeer.save();
    res.json({ success: true, message: "Reinsdyr lagt til!", data: newReindeer });
  } catch (error) {
    console.error("Error adding reindeer:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { searchReindeer, addReindeer };


