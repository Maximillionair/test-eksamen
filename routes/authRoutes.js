const express = require("express");
const { registerUser, loginOwner } = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginOwner);

module.exports = router;
