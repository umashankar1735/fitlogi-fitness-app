const express = require("express");
const router = express.Router();
const FoodItem = require("../models/FoodItem");

const goalMap = {
  "weightgaindietplan": "weight gain diet plan",
  "weightloosedietplan": "weight loose diet plan",
  "strictdietplan": "strict-dietplan",
  "nightdietplan": "night-dietplan",
  "gmdietplan": "gm-dietplan",
  "fitnessdietplan": "fitness-dietplan",
};

router.get("/:goal", async (req, res) => {
  try {
    const rawGoal = req.params.goal.toLowerCase().replace(/[^a-z0-9]/gi, "");
    console.log("🧠 Cleaned goal param:", rawGoal);

    const formattedGoal = goalMap[rawGoal];
    if (!formattedGoal) {
      return res.status(400).json({ error: "Invalid goal name provided." });
    }

    const items = await FoodItem.find({ goal: formattedGoal });
    if (!items.length) {
      return res.status(404).json({ message: "No food items found for this goal." });
    }

    res.json(items);
  } catch (err) {
    console.error("❌ Error in fetching foods:", err);
    res.status(400).json({ error: "Something went wrong." });
  }
});

module.exports = router;
