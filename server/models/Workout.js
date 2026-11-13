const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  title: String,
  day: String,
  type: String,
  goal: String,
  image: String,
  exercises: [
    {
      name: String,
      duration: String,
      calories: Number,
    },
  ],
});

module.exports = mongoose.model("Workout", workoutSchema);
