const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

// ✅ GET all workout plans
router.get('/plans', async (req, res) => {
  try {
    const plans = await Workout.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch workout plans" });
  }
});

// ✅ DELETE a workout plan
router.delete("/:id", async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.json({ message: "Workout plan deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete workout plan" });
  }
});

// ✅ POST (optional): Add a new workout plan
router.post("/", async (req, res) => {
  const { name, description, exercises } = req.body;
  try {
    const newWorkout = new Workout({ name, description, exercises });
    await newWorkout.save();
    res.status(201).json(newWorkout);
  } catch (err) {
    res.status(500).json({ error: "Failed to create workout plan" });
  }
});

module.exports = router;
