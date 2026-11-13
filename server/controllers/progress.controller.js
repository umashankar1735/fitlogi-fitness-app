const Progress = require("../models/Progress");

// 🆕 LOG WORKOUT — matches frontend route POST /api/progress/log
exports.logWorkout = async (req, res) => {
  try {
    const { userId, date, workoutName, exercises, notes, durationMinutes, caloriesBurned } = req.body;

    if (!userId || !date || !workoutName || !exercises) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newEntry = new Progress({
      userId,
      date,
      workoutName,
      exercises,
      notes,
      durationMinutes,
      caloriesBurned,
    });

    await newEntry.save();
    res.status(201).json({ message: "Workout logged successfully", progress: newEntry });
  } catch (error) {
    console.error("❌ Error logging workout:", error);
    res.status(500).json({ message: "Error logging workout", error: error.message });
  }
};

// ➕ Add Progress (generic)
exports.addProgress = async (req, res) => {
  try {
    const progress = new Progress(req.body);
    await progress.save();
    res.status(201).json(progress);
  } catch (err) {
    console.error("❌ Error adding progress:", err);
    res.status(400).json({ message: "Failed to add progress", error: err.message });
  }
};

// 📄 Get All Progress for User
exports.getUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await Progress.find({ userId }).sort({ date: -1 });
    res.json(progress);
  } catch (err) {
    console.error("❌ Error fetching user progress:", err);
    res.status(500).json({ message: "Failed to get user progress", error: err.message });
  }
};

// 📅 Filter by Date Range
exports.filterByDateRange = async (req, res) => {
  const { userId } = req.params;
  const { startDate, endDate } = req.query;

  try {
    const data = await Progress.find({
      userId,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    }).sort({ date: 1 });

    res.json(data);
  } catch (err) {
    console.error("❌ Error filtering progress by date:", err);
    res.status(500).json({ message: "Failed to filter by date range", error: err.message });
  }
};

// 📊 Get Weekly Summary
exports.getWeeklySummary = async (req, res) => {
  const { userId } = req.params;
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - 6);
  startOfWeek.setHours(0, 0, 0, 0); // Reset time

  try {
    const progress = await Progress.find({
      userId,
      date: { $gte: startOfWeek },
    });

    const totalMins = progress.reduce((sum, item) => sum + (item.durationMinutes || 0), 0);
    const totalCalories = progress.reduce((sum, item) => sum + (item.caloriesBurned || 0), 0);

    res.json({
      totalMinutes: totalMins,
      avgCalories: progress.length > 0 ? totalCalories / progress.length : 0,
      daysTracked: progress.length,
    });
  } catch (err) {
    console.error("❌ Error fetching weekly summary:", err);
    res.status(500).json({ message: "Failed to get weekly summary", error: err.message });
  }
};

// ✏️ Update Progress
exports.updateProgress = async (req, res) => {
  try {
    const updated = await Progress.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Progress entry not found" });
    }
    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating progress:", err);
    res.status(500).json({ message: "Failed to update progress", error: err.message });
  }
};

// ❌ Delete Progress
exports.deleteProgress = async (req, res) => {
  try {
    const deleted = await Progress.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Progress entry not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting progress:", err);
    res.status(500).json({ message: "Failed to delete progress", error: err.message });
  }
};
