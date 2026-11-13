// models/exercise.model.js
const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g. Cardio, Strength, Yoga
  duration: { type: Number, required: true }, // in minutes
  calories: { type: Number, required: true }, // auto-calculated
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Exercise", exerciseSchema);
