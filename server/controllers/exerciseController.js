const Exercise = require("../models/exercise.model");
const Progress = require("../models/Progress");

exports.logExercise = async (req, res) => {
  try {
    const { userId, name, type, duration, caloriesBurned, date } = req.body;

    // Validate
    if (!userId || !name || !type || !duration || !caloriesBurned) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create and save exercise
    const exercise = new Exercise({
      userId,
      name,
      type,
      duration,
      caloriesBurned,
      date: date || new Date(),
    });

    const savedExercise = await exercise.save();

    // Update progress
    const today = new Date().toDateString();

    let progress = await Progress.findOne({ userId, date: today });

    if (progress) {
      progress.totalMinutes += duration;
      progress.totalCalories += caloriesBurned;
      progress.exercises.push(savedExercise._id);
      await progress.save();
    } else {
      await Progress.create({
        userId,
        date: today,
        totalMinutes: duration,
        totalCalories: caloriesBurned,
        exercises: [savedExercise._id],
      });
    }

    res.status(201).json({ message: "Exercise logged successfully", exercise: savedExercise });
  } catch (error) {
    console.error("❌ Error logging exercise:", error.message);
    res.status(500).json({ error: "Server error while logging exercise" });
  }
};

exports.getUserExercises = async (req, res) => {
  try {
    const { userId } = req.params;

    const exercises = await Exercise.find({ userId }).sort({ date: -1 });

    res.json(exercises);
  } catch (error) {
    console.error("❌ Error fetching exercises:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
