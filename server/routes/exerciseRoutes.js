const express = require("express");
const router = express.Router();
const Exercise = require("../models/Exercise"); // make sure this path is correct

// ✅ Get all exercises for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const exercises = await Exercise.find({ userId: req.params.userId });
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add a new exercise
router.post("/", async (req, res) => {
  try {
    const newExercise = new Exercise(req.body);
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Update an existing exercise
router.put("/:id", async (req, res) => {
  try {
    const updated = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete an exercise
router.delete("/:id", async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.json({ message: "Exercise deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
