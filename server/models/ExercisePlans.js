// models/ExercisePlan.js

const mongoose = require("mongoose");

const ExercisePlanSchema = new mongoose.Schema({
  title: String,
  category: String,
  level: String,
  duration: String,
  image: String,
  exercises: [String],
});

module.exports = mongoose.model("ExercisePlan", ExercisePlanSchema);
