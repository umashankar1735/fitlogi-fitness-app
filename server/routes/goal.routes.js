const express = require("express");
const router = express.Router();
const Goal = require("../models/Goal");
const Exercise = require("../models/Exercise");

// Add selected exercise to goals with goal type
router.post("/", async (req, res) => {
  try {
    const { exerciseId, goalType } = req.body;

    const existing = await Goal.findOne({ exerciseId, goalType });
    if (existing) return res.status(409).json({ message: "Already added!" });

    const newGoal = new Goal({ exerciseId, goalType });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all goals with populated exercise data
router.get("/", async (req, res) => {
  try {
    const goals = await Goal.find().populate("exerciseId");
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
