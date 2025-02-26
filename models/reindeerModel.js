const mongoose = require("mongoose");

const ReindeerSchema = new mongoose.Schema({
  serialNumber: { type: String, required: true, unique: true },
  name: String,
  flock: { type: mongoose.Schema.Types.ObjectId, ref: "Flock",  },
  age: Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Owner",  }
});

module.exports = mongoose.model("Reindeer", ReindeerSchema);
