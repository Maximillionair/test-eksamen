const express = require("express");
const { registerOwner, loginOwner } = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerOwner);

router.post("/login", loginOwner);

module.exports = router;
