const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progress.controller");

// ✅ Route used by the Exercise block to log a workout
router.post("/log", progressController.logWorkout);

// ✅ Add new progress manually (used by admin or backend seeders maybe)
router.post("/", progressController.addProgress);

// ✅ Get all progress data for a specific user
router.get("/:userId", progressController.getUserProgress);

// ✅ Filter user progress by a date range
router.get("/:userId/filter", progressController.filterByDateRange);

// ✅ Get weekly summary for dashboard/progress chart
router.get("/:userId/weekly-summary", progressController.getWeeklySummary);

// ✅ Update a specific progress record
router.put("/:id", progressController.updateProgress);

// ✅ Delete a specific progress record
router.delete("/:id", progressController.deleteProgress);

module.exports = router;
