const mongoose = require("mongoose");

const ReindeerSchema = new mongoose.Schema({
  serialNumber: { type: String, required: true },
  name: { type: String, required: true },
  flock: { type: mongoose.Schema.Types.ObjectId, ref: "Flock" }, // Flock remains an ObjectId
  age: { type: Number, required: true },
  owner: { type: String, required: true }, // Store owner's name instead of ObjectId
});

module.exports = mongoose.model("Reindeer", ReindeerSchema);
