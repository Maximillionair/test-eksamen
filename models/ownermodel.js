const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const OwnerSchema = new mongoose.Schema({
  name: String,
  uuid: String,
  email: { type: String, unique: true, required: true, match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ },
  password: { type: String, required: true, minlength: 6 },
  language: String,
  phone: String,
});


OwnerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("Owner", OwnerSchema);
