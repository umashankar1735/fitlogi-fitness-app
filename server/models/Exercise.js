const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // MUST be present!
  name: { type: String, required: true },
  category: String,
  duration: Number,
  calories: Number,
  date: { type: Date, required: true }
});

module.exports = mongoose.model("Exercise", exerciseSchema);
