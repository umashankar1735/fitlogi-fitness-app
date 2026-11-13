// server/models/FoodItem.js
const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  mealType: { type: String, required: true }, // e.g., breakfast, lunch, dinner, snack
  goal: { type: String, required: true },     // e.g., weight gain diet plan
});

module.exports = mongoose.model("FoodItem", foodItemSchema);
