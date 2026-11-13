import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./CalorieDetails.css";

function CalorieDetails() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [servings, setServings] = useState(1);
  const [dailyLog, setDailyLog] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Beverages"];

  useEffect(() => {
    fetchFoods();
    loadDailyLog();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/foods");
      const data = await response.json();
      // Ensure data is an array
      if (Array.isArray(data)) {
        setFoods(data);
      } else {
        console.warn("API returned non-array data, using sample foods");
        setFoods(generateSampleFoods());
      }
    } catch (error) {
      console.error("Error fetching foods:", error);
      setFoods(generateSampleFoods());
    }
  };

  const generateSampleFoods = () => {
    return [
      { name: "Oatmeal", calories: 150, protein: 6, carbs: 27, fat: 3, fiber: 4, category: "Breakfast" },
      { name: "Scrambled Eggs", calories: 200, protein: 14, carbs: 2, fat: 15, fiber: 0, category: "Breakfast" },
      { name: "Grilled Chicken", calories: 165, protein: 31, carbs: 0, fat: 4, fiber: 0, category: "Lunch" },
      { name: "Brown Rice", calories: 216, protein: 5, carbs: 45, fat: 2, fiber: 4, category: "Lunch" },
      { name: "Salmon Fillet", calories: 280, protein: 25, carbs: 0, fat: 20, fiber: 0, category: "Dinner" },
      { name: "Quinoa Bowl", calories: 222, protein: 8, carbs: 39, fat: 4, fiber: 5, category: "Dinner" },
      { name: "Greek Yogurt", calories: 130, protein: 11, carbs: 9, fat: 5, fiber: 0, category: "Snacks" },
      { name: "Banana", calories: 105, protein: 1, carbs: 27, fat: 0, fiber: 3, category: "Snacks" },
      { name: "Almonds", calories: 164, protein: 6, carbs: 6, fat: 14, fiber: 4, category: "Snacks" },
      { name: "Green Tea", calories: 2, protein: 0, carbs: 0, fat: 0, fiber: 0, category: "Beverages" },
      { name: "Protein Shake", calories: 200, protein: 25, carbs: 10, fat: 5, fiber: 2, category: "Beverages" },
      { name: "Sweet Potato", calories: 180, protein: 4, carbs: 41, fat: 0, fiber: 6, category: "Lunch" },
      { name: "Avocado Toast", calories: 250, protein: 8, carbs: 30, fat: 12, fiber: 8, category: "Breakfast" },
      { name: "Caesar Salad", calories: 320, protein: 12, carbs: 18, fat: 22, fiber: 4, category: "Lunch" },
      { name: "Paneer Tikka", calories: 280, protein: 18, carbs: 12, fat: 18, fiber: 2, category: "Dinner" },
    ];
  };

  const loadDailyLog = () => {
    const saved = localStorage.getItem("calorieLog");
    if (saved) {
      setDailyLog(JSON.parse(saved));
    }
  };

  const saveDailyLog = (log) => {
    localStorage.setItem("calorieLog", JSON.stringify(log));
    setDailyLog(log);
  };

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    setServings(1);
    setShowModal(true);
  };

  const handleAddToLog = () => {
    const logEntry = {
      ...selectedFood,
      servings,
      totalCalories: selectedFood.calories * servings,
      timestamp: new Date().toISOString(),
    };
    const updatedLog = [...dailyLog, logEntry];
    saveDailyLog(updatedLog);
    setShowModal(false);
    setSelectedFood(null);
  };

  const handleRemoveFromLog = (index) => {
    const updatedLog = dailyLog.filter((_, i) => i !== index);
    saveDailyLog(updatedLog);
  };

  const totalCalories = dailyLog.reduce((sum, item) => sum + item.totalCalories, 0);
  const totalProtein = dailyLog.reduce((sum, item) => sum + item.protein * item.servings, 0);
  const totalCarbs = dailyLog.reduce((sum, item) => sum + item.carbs * item.servings, 0);
  const totalFat = dailyLog.reduce((sum, item) => sum + item.fat * item.servings, 0);

  return (
    <>
      <Navbar />
      <div className="calorie-tracker-page">
        <div className="calorie-hero">
          <div className="hero-overlay">
            <h1>🍽️ Calorie Tracker</h1>
            <p>Track your daily nutrition and reach your health goals</p>
          </div>
        </div>

        <div className="calorie-content">
          <div className="daily-summary">
            <h2>Today's Summary</h2>
            <div className="summary-grid">
              <div className="summary-card">
                <span className="summary-value">{totalCalories}</span>
                <span className="summary-label">Calories</span>
              </div>
              <div className="summary-card">
                <span className="summary-value">{totalProtein.toFixed(1)}g</span>
                <span className="summary-label">Protein</span>
              </div>
              <div className="summary-card">
                <span className="summary-value">{totalCarbs.toFixed(1)}g</span>
                <span className="summary-label">Carbs</span>
              </div>
              <div className="summary-card">
                <span className="summary-value">{totalFat.toFixed(1)}g</span>
                <span className="summary-label">Fat</span>
              </div>
            </div>
          </div>

          {dailyLog.length > 0 && (
            <div className="daily-log-section">
              <h3>Today's Food Log ({dailyLog.length} items)</h3>
              <div className="log-items">
                {dailyLog.map((item, index) => (
                  <div key={index} className="log-item">
                    <div className="log-item-info">
                      <h4>{item.name}</h4>
                      <p>{item.servings} serving{item.servings > 1 ? 's' : ''} • {item.totalCalories} kcal</p>
                    </div>
                    <button className="remove-btn" onClick={() => handleRemoveFromLog(index)}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="food-search-section">
            <h3>Search & Add Foods</h3>
            <div className="search-controls">
              <input
                type="text"
                placeholder="Search for foods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <div className="category-filters">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="food-grid">
              {filteredFoods.map((food, index) => (
                <div key={index} className="food-card" onClick={() => handleFoodClick(food)}>
                  <div className="food-card-header">
                    <h4>{food.name}</h4>
                    <span className="category-badge">{food.category}</span>
                  </div>
                  <div className="food-calories">
                    <span className="calories-value">{food.calories}</span>
                    <span className="calories-label">kcal</span>
                  </div>
                  <div className="food-macros">
                    <span>P: {food.protein}g</span>
                    <span>C: {food.carbs}g</span>
                    <span>F: {food.fat}g</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showModal && selectedFood && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="food-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={() => setShowModal(false)}>✕</button>
              <h2>{selectedFood.name}</h2>
              <div className="modal-nutrition">
                <div className="nutrition-item">
                  <span className="nutrition-label">Calories</span>
                  <span className="nutrition-value">{selectedFood.calories * servings} kcal</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Protein</span>
                  <span className="nutrition-value">{selectedFood.protein * servings}g</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Carbs</span>
                  <span className="nutrition-value">{selectedFood.carbs * servings}g</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Fat</span>
                  <span className="nutrition-value">{selectedFood.fat * servings}g</span>
                </div>
                <div className="nutrition-item">
                  <span className="nutrition-label">Fiber</span>
                  <span className="nutrition-value">{selectedFood.fiber * servings}g</span>
                </div>
              </div>
              <div className="servings-control">
                <label>Servings:</label>
                <div className="servings-buttons">
                  <button onClick={() => setServings(Math.max(1, servings - 1))}>−</button>
                  <span>{servings}</span>
                  <button onClick={() => setServings(servings + 1)}>+</button>
                </div>
              </div>
              <button className="add-to-log-btn" onClick={handleAddToLog}>
                Add to Daily Log
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CalorieDetails;
