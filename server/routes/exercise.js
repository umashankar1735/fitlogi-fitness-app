const express = require("express");
const router = express.Router();
const Exercise = require("../models/Exercise");

// Add new exercise
router.post("/add", async (req, res) => {
  try {
    const { userId, name, description, duration, calories, imageUrl } = req.body;

    const newExercise = new Exercise({
      userId,
      name,
      description,
      duration,
      calories,
      imageUrl,
    });

    await newExercise.save();
    res.status(201).json({ message: "Exercise added!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add exercise" });
  }
});

// Get all exercises for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const exercises = await Exercise.find({ userId: req.params.userId });
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch exercises" });
  }
});

// Delete an exercise
router.delete("/delete/:id", async (req, res) => {
  try {
    await Exercise.findByIdAndDelete(req.params.id);
    res.json({ message: "Exercise deleted!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete exercise" });
  }
});

module.exports = router;
