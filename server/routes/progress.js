const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");
const dayjs = require("dayjs");

router.post("/log", async (req, res) => {
  try {
    const { user_id, date, duration, calories } = req.body;
    const newWorkout = new Workout({ user_id, date, duration, calories });
    await newWorkout.save();
    res.json({ message: "Workout logged successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/progress/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const today = dayjs();
    const todayStr = today.format("YYYY-MM-DD");
    const startOfWeek = today.startOf("week").format("YYYY-MM-DD");
    const startOfMonth = today.subtract(30, "day").format("YYYY-MM-DD");

    const logs = await Workout.find({
      user_id,
      date: { $gte: startOfMonth, $lte: todayStr }
    });

    const weekMap = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
    let totalMinutes = 0;
    let totalCalories = 0;
    let todayCount = 0;
    const workoutDays = new Set();

    logs.forEach(log => {
      const logDate = dayjs(log.date);
      const dayLabel = logDate.format("ddd");

      if (logDate.isAfter(startOfWeek) || logDate.isSame(startOfWeek)) {
        weekMap[dayLabel]++;
        totalMinutes += log.duration;
        totalCalories += log.calories;
      }

      if (log.date === todayStr) {
        todayCount++;
      }

      workoutDays.add(log.date);
    });

    const avgCalories =
      logs.length > 0 ? Math.round(totalCalories / logs.length) : 0;

    res.json({
      weeklyData: Object.values(weekMap),          // [Sun, Mon, Tue, ..., Sat]
      dailyCount: todayCount,
      weeklyTotalMinutes: totalMinutes,
      weeklyAvgCalories: avgCalories,
      monthlyWorkoutDays: workoutDays.size
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
