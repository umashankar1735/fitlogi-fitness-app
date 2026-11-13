const express = require("express");
const router = express.Router();
const Reminder = require("../models/reminder.model");

// Add Reminder
router.post("/", async (req, res) => {
  try {
    const reminder = new Reminder(req.body);
    const saved = await reminder.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to add reminder" });
  }
});

// Get all reminders for a user
router.get("/:userId", async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.params.userId });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reminders" });
  }
});

// Update reminder
router.put("/:id", async (req, res) => {
  try {
    const updated = await Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update reminder" });
  }
});

// Delete reminder
router.delete("/:id", async (req, res) => {
  try {
    await Reminder.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete reminder" });
  }
});

module.exports = router;
