const Reindeer = require("../models/Reindeer");
const mongoose = require("mongoose");

// Funksjon for å søke etter reinsdyr
// const searchReindeer = async (req, res) => {
//   try {
//     const query = req.query.query;
//     let searchConditions = [{ name: { $regex: query, $options: 'i' } }];

//     if (mongoose.Types.ObjectId.isValid(query)) {
//       searchConditions.push({ _id: query });
//     }

//     const reindeerList = await Reindeer.find({ $or: searchConditions });

//     res.render("reindeer/searchResults", { reindeerList });
//   } catch (error) {
//     console.error("Error searching for reindeer:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };

const searchReindeer = async (req, res) => {
  try {
      const query = req.query.query;
      const results = await Reindeer.find({
          $or: [
              { name: { $regex: query, $options: 'i' } }, // Søker etter navn
              { id: query } // Eller ID
          ]
      });

      res.json(results); // Sender JSON i stedet for å rendre EJS
  } catch (error) {
      console.error("Feil ved søk etter reinsdyr:", error);
      res.status(500).json({ error: "Intern serverfeil" });
  }
};

// Funksjon for å legge til et nytt reinsdyr
const addReindeer = async (req, res) => {
  try {
    const { name, flock, birthDate } = req.body;

    if (!name || !flock || !birthDate) {
      return res.status(400).send("Alle feltene må fylles ut!");
    }

    const newReindeer = new Reindeer({
      name,
      flock,
      birthDate,
      owner: req.user ? req.user.id : null,
    });

    await newReindeer.save();
    res.redirect("/reindeer/search");
  } catch (error) {
    console.error("Error adding reindeer:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { searchReindeer, addReindeer };

