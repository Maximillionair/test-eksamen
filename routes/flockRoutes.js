const express = require("express");
const { addFlock, getFlocks } = require("../controllers/flockController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to render the flock creation form
router.get("/addFlock", (req, res) => {
    res.render("addFlock"); // Renders the EJS form
});

// Route to handle flock creation

router.post("/add", authMiddleware, (req, res, next) => {
    if (!req.owner) {
      return res.status(403).json({ message: "Unauthorized: You must be logged in to add flock" });
    }
    next();
  }, addFlock);

module.exports = router;