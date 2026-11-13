// server/models/Progress.js
const mongoose = require("mongoose");

// You can keep this as String if you aren’t storing real ObjectIds for users yet.
const ExerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    durationMinutes: { type: Number, default: 0 }, // per-exercise duration
    distanceKm: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 0 },
  },
  { _id: false }
);

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // change to mongoose.Schema.Types.ObjectId with ref: "User" when you wire real users
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },

    // A human friendly label you sent from the frontend (e.g. “Morning Cardio”)
    workoutName: { type: String },

    // Totals per logged workout entry (used by your weekly summary)
    durationMinutes: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 0 },

    // Detailed breakdown of the workout
    exercises: {
      type: [ExerciseSchema],
      default: [],
    },

    notes: { type: String },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// Helpful index for fast queries by user & date
progressSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model("Progress", progressSchema);
