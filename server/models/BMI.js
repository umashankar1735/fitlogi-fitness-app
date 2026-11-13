const mongoose = require("mongoose");

const BmiSchema = new mongoose.Schema(
  {
    name: String,
    height: Number,
    weight: Number,
    bmi: Number,
    category: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bmi", BmiSchema);
