const mongoose = require("mongoose");

const UserExerciseSchema = new mongoose.Schema({
  userId: String,
  exerciseId: String,
  addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UserExercise", UserExerciseSchema);
