const Reindeer = require("../models/Reindeer");
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
    const { name, flock, birthDate } = req.body;

    if (!name || !flock || !birthDate) {
      return res.status(400).json({ success: false, message: "Alle feltene må fylles ut!" });
    }

    const newReindeer = new Reindeer({
      name,
      flock,
      birthDate,
      owner: req.user ? req.user.id : null,
    });

    await newReindeer.save();
    res.json({ success: true, message: "Reinsdyr lagt til!", data: newReindeer });
  } catch (error) {
    console.error("Error adding reindeer:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { searchReindeer, addReindeer };


