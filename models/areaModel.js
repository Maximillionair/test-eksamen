const mongoose = require("mongoose");

const AreaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  counties: [String], // List of counties the area belongs to
  primaryGrazingArea: String,
});

module.exports = mongoose.model("Area", AreaSchema);
