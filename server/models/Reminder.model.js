const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  medicineName: String,
  date: String, // "2025-07-20"
  time: String, // "14:30"
  note: String,
  taken: { type: Boolean, default: false }
});

module.exports = mongoose.model("Reminder", reminderSchema);
