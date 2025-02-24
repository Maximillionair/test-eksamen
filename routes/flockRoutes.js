const express = require("express");
const { getFlocks } = require("../controllers/flockController");
const router = express.Router();

router.get("/", getFlocks);

module.exports = router;
