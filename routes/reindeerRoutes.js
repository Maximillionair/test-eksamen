const express = require("express");
const { searchReindeer, addReindeer } = require("../controllers/reindeerController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/search", searchReindeer);
router.post("/add", authMiddleware, addReindeer);

module.exports = router;