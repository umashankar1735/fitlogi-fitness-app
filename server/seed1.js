const mongoose = require("mongoose");
const FoodItem = require("./models/FoodItem");

mongoose.connect("mongodb://127.0.0.1:27017/fitlogi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const foodItems = [
  // 🔥 Fitness Diet Plan
  { name: "Grilled Chicken Breast", calories: 250, quantity: "1 piece", mealType: "lunch", goal: "fitness-dietplan" },
  { name: "Protein Shake", calories: 180, quantity: "1 glass", mealType: "breakfast", goal: "fitness-dietplan" },
  { name: "Oats with Fruits", calories: 200, quantity: "1 bowl", mealType: "breakfast", goal: "fitness-dietplan" },
  { name: "Quinoa Salad", calories: 220, quantity: "1 bowl", mealType: "lunch", goal: "fitness-dietplan" },
  { name: "Greek Yogurt", calories: 150, quantity: "1 cup", mealType: "snack", goal: "fitness-dietplan" },
  { name: "Mixed Nuts", calories: 100, quantity: "1 handful", mealType: "snack", goal: "fitness-dietplan" },
  { name: "Boiled Eggs", calories: 140, quantity: "2 eggs", mealType: "breakfast", goal: "fitness-dietplan" },
  { name: "Fruit Smoothie", calories: 160, quantity: "1 glass", mealType: "snack", goal: "fitness-dietplan" },
  { name: "Grilled Paneer", calories: 210, quantity: "1 plate", mealType: "dinner", goal: "fitness-dietplan" },
  { name: "Vegetable Soup", calories: 80, quantity: "1 bowl", mealType: "dinner", goal: "fitness-dietplan" },

  // 🔥 GM Diet Plan
  { name: "Boiled Eggs", calories: 140, quantity: "2 eggs", mealType: "breakfast", goal: "gm-dietplan" },
  { name: "Tomato Soup", calories: 90, quantity: "1 bowl", mealType: "lunch", goal: "gm-dietplan" },
  { name: "Boiled Potato", calories: 120, quantity: "1 medium", mealType: "dinner", goal: "gm-dietplan" },
  { name: "Banana", calories: 100, quantity: "1 piece", mealType: "breakfast", goal: "gm-dietplan" },
  { name: "Brown Rice", calories: 220, quantity: "1 bowl", mealType: "lunch", goal: "gm-dietplan" },
  { name: "Watermelon", calories: 60, quantity: "1 slice", mealType: "snack", goal: "gm-dietplan" },
  { name: "Cabbage Soup", calories: 70, quantity: "1 bowl", mealType: "dinner", goal: "gm-dietplan" },
  { name: "Carrot Sticks", calories: 40, quantity: "1 cup", mealType: "snack", goal: "gm-dietplan" },
  { name: "Spinach Salad", calories: 90, quantity: "1 bowl", mealType: "lunch", goal: "gm-dietplan" },
  { name: "Mixed Fruit Bowl", calories: 120, quantity: "1 bowl", mealType: "breakfast", goal: "gm-dietplan" },

  // 🔥 Night Diet Plan
  { name: "Steamed Veggies", calories: 100, quantity: "1 bowl", mealType: "dinner", goal: "night-dietplan" },
  { name: "Lentil Soup", calories: 130, quantity: "1 bowl", mealType: "dinner", goal: "night-dietplan" },
  { name: "Cucumber Salad", calories: 60, quantity: "1 bowl", mealType: "dinner", goal: "night-dietplan" },
  { name: "Grilled Fish", calories: 200, quantity: "1 fillet", mealType: "dinner", goal: "night-dietplan" },
  { name: "Tofu Stir Fry", calories: 150, quantity: "1 plate", mealType: "dinner", goal: "night-dietplan" },
  { name: "Zucchini Noodles", calories: 110, quantity: "1 bowl", mealType: "dinner", goal: "night-dietplan" },
  { name: "Pumpkin Soup", calories: 90, quantity: "1 bowl", mealType: "dinner", goal: "night-dietplan" },
  { name: "Baked Sweet Potato", calories: 120, quantity: "1 piece", mealType: "dinner", goal: "night-dietplan" },
  { name: "Avocado Salad", calories: 140, quantity: "1 bowl", mealType: "dinner", goal: "night-dietplan" },
  { name: "Cabbage Stir Fry", calories: 80, quantity: "1 plate", mealType: "dinner", goal: "night-dietplan" },

  // 🔥 Strict Diet Plan
  { name: "Sprouts Salad", calories: 120, quantity: "1 bowl", mealType: "breakfast", goal: "strict-dietplan" },
  { name: "Green Tea", calories: 5, quantity: "1 cup", mealType: "snack", goal: "strict-dietplan" },
  { name: "Boiled Broccoli", calories: 50, quantity: "1 cup", mealType: "lunch", goal: "strict-dietplan" },
  { name: "Tofu Cubes", calories: 100, quantity: "1 bowl", mealType: "lunch", goal: "strict-dietplan" },
  { name: "Low-fat Milk", calories: 90, quantity: "1 glass", mealType: "breakfast", goal: "strict-dietplan" },
  { name: "Carrot Juice", calories: 80, quantity: "1 glass", mealType: "snack", goal: "strict-dietplan" },
  { name: "Bitter Gourd Curry", calories: 90, quantity: "1 bowl", mealType: "dinner", goal: "strict-dietplan" },
  { name: "Boiled Moong Dal", calories: 100, quantity: "1 bowl", mealType: "lunch", goal: "strict-dietplan" },
  { name: "Cabbage Soup", calories: 70, quantity: "1 bowl", mealType: "dinner", goal: "strict-dietplan" },
  { name: "Coconut Water", calories: 45, quantity: "1 glass", mealType: "snack", goal: "strict-dietplan" },

  // 🔥 Weight Gain Diet Plan
  { name: "Banana Shake", calories: 180, quantity: "1 glass", mealType: "breakfast", goal: "weight gain diet plan" },
  { name: "Peanut Butter Toast", calories: 250, quantity: "2 slices", mealType: "breakfast", goal: "weight gain diet plan" },
  { name: "Paneer Paratha", calories: 300, quantity: "1 paratha", mealType: "lunch", goal: "weight gain diet plan" },
  { name: "Dry Fruits Mix", calories: 200, quantity: "1 handful", mealType: "snack", goal: "weight gain diet plan" },
  { name: "Boiled Chana", calories: 150, quantity: "1 bowl", mealType: "lunch", goal: "weight gain diet plan" },
  { name: "Protein Shake", calories: 250, quantity: "1 glass", mealType: "snack", goal: "weight gain diet plan" },
  { name: "Sweet Potato", calories: 120, quantity: "1 medium", mealType: "dinner", goal: "weight gain diet plan" },
  { name: "Paneer Tikka", calories: 220, quantity: "1 plate", mealType: "dinner", goal: "weight gain diet plan" },
  { name: "Almond Milk", calories: 100, quantity: "1 glass", mealType: "breakfast", goal: "weight gain diet plan" },
  { name: "Vegetable Pulao", calories: 280, quantity: "1 bowl", mealType: "lunch", goal: "weight gain diet plan" },

  // 🔥 Weight Loose Diet Plan
  { name: "Cucumber Detox Water", calories: 30, quantity: "1 glass", mealType: "lunch", goal: "weight loose diet plan" },
  { name: "Low Cal Oats", calories: 150, quantity: "1 bowl", mealType: "breakfast", goal: "weight loose diet plan" },
  { name: "Fruit Salad", calories: 100, quantity: "1 bowl", mealType: "snack", goal: "weight loose diet plan" },
  { name: "Brown Bread Toast", calories: 120, quantity: "2 slices", mealType: "breakfast", goal: "weight loose diet plan" },
  { name: "Vegetable Soup", calories: 80, quantity: "1 bowl", mealType: "dinner", goal: "weight loose diet plan" },
  { name: "Boiled Lentils", calories: 130, quantity: "1 bowl", mealType: "lunch", goal: "weight loose diet plan" },
  { name: "Apple", calories: 95, quantity: "1 piece", mealType: "snack", goal: "weight loose diet plan" },
  { name: "Green Tea", calories: 5, quantity: "1 cup", mealType: "snack", goal: "weight loose diet plan" },
  { name: "Cabbage Stir Fry", calories: 90, quantity: "1 bowl", mealType: "dinner", goal: "weight loose diet plan" },
  { name: "Boiled Corn", calories: 100, quantity: "1 cup", mealType: "snack", goal: "weight loose diet plan" },
];

async function seedData() {
  try {
    await FoodItem.deleteMany({});
    await FoodItem.insertMany(foodItems);
    console.log("🌱 60 food items inserted successfully!");
  } catch (err) {
    console.error("❌ Error inserting data:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedData();
