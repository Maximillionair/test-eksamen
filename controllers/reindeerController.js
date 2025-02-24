// controllers/reindeerController.js
const Reindeer = require('../models/reindeerModel'); // Husk å importere Reindeer-modellen

// Funksjon for å søke etter reinsdyr
const searchReindeer = async (req, res) => {
  try {
    const query = req.query.query; // Eller hent ut parameter fra URL
    const results = await Reindeer.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // Søke på navn
        { id: query } // Eller på serienummer
      ]
    });

    res.render('reindeer/searchResults', { results }); // Renderer søkresultatene på EJS-siden
  } catch (error) {
    console.error("Error searching for reindeer:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Funksjon for å legge til et nytt reinsdyr
const addReindeer = async (req, res) => {
  try {
    const { name, flock, birthDate } = req.body;
    const newReindeer = new Reindeer({
      name,
      flock,
      birthDate,
      owner: req.user.id // Hvis du har autentisering på plass
    });

    await newReindeer.save();
    res.redirect("/reindeer/search"); // Redirect til søkesiden etter registrering
  } catch (error) {
    console.error("Error adding reindeer:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { searchReindeer, addReindeer };
