const mongoose = require("mongoose");

const FlockSchema = new mongoose.Schema({
  name: { type: String, required: true,},
  owner: { type: String, required: true },
  series: String,
  buemerkeName: String,
  buemerkeImage: String,
});

module.exports = mongoose.model("Flock", FlockSchema);
