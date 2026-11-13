const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  duration: String,
  calories: Number,
  imageUrl: String,
  time: String
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
