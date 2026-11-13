const express = require("express");
const router = express.Router();
const BmiModel = require("../models/Bmi");

// POST: Calculate & Save BMI
router.post("/", async (req, res) => {
  try {
    const { name, height, weight } = req.body;
    if (!name || !height || !weight) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    const category =
      bmi < 18.5
        ? "Underweight"
        : bmi < 24.9
        ? "Normal"
        : bmi < 29.9
        ? "Overweight"
        : "Obese";

    const saved = await BmiModel.create({ name, height, weight, bmi, category });
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET: Fetch All BMI Records
router.get("/", async (req, res) => {
  try {
    const records = await BmiModel.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Error fetching records" });
  }
});

module.exports = router;
