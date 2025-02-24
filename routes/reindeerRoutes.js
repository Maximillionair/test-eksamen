const express = require("express");
const { searchReindeer, addReindeer } = require("../controllers/reindeerController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// GET-rute for å søke etter reinsdyr
router.get("/search", searchReindeer);

// POST-rute for å legge til reinsdyr (kun for autoriserte brukere)
router.post("/add", authMiddleware, addReindeer);

module.exports = router;
