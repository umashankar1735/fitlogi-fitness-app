const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Goal Schema
const goalSchema = new mongoose.Schema({
  title: String,
  description: String,
  target: Number,
  unit: String,
  category: String,
  deadline: String,
  createdAt: { type: Date, default: Date.now },
});

const Goal = mongoose.model("Goal", goalSchema);

// GET all goals
router.get("/", async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new goal
router.post("/", async (req, res) => {
  try {
    const newGoal = new Goal(req.body);
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
