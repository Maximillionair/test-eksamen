const express = require("express");
const { getOwners } = require("../controllers/ownerController");
const router = express.Router();

router.get("/", getOwners);

module.exports = router;
