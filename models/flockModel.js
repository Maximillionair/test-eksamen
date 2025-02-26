const mongoose = require("mongoose");

const FlockSchema = new mongoose.Schema({
  name: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true },
  series: String,
  buemerkeName: String,
  buemerkeImage: String,
});

module.exports = mongoose.model("Flock", FlockSchema);
