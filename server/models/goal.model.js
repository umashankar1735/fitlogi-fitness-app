const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
    required: true,
  },
});

module.exports = mongoose.model("Goal", goalSchema);
