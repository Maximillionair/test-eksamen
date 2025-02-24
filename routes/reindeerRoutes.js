const express = require("express");
const { searchReindeer, addReindeer } = require("../controllers/reindeerController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// GET-rute for å søke etter reinsdyr
router.get("/search", searchReindeer);

router.get("/add", addReindeer)

// POST-rute for å legge til reinsdyr (kun for autoriserte brukere)
router.post("reindeer/add", authMiddleware, (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ message: "Unauthorized: You must be logged in to add reindeer" });
    }
    next();
  }, addReindeer);
  

module.exports = router;
