import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./DietDetails.css";

function DietDetails() {
  const { goal } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const normalizedGoal = goal?.toLowerCase().replace(/\s+/g, "-");

  const goalMap = {
    "weight-gain-diet-plan": "weight-gain-diet-plan",
    "weight-loose-diet-plan": "weight-loose-diet-plan",
    "strict-diet-plan": "strict-dietplan",
    "night-diet-plan": "night-dietplan",
    "gm-diet-plan": "gm-dietplan",
    "fitness-diet-plan": "fitness-dietplan",
  };

  const mealIcons = {
    breakfast: "🍳",
    lunch: "🍲",
    dinner: "🍝",
    snack: "🍪"
  };

  useEffect(() => {
    const backendGoal = goalMap[normalizedGoal];

    if (!goal || !backendGoal) {
      setError("Invalid or missing goal in URL.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5001/api/foods/${backendGoal}`)
      .then((response) => {
        setItems(response.data);
        setError("");
      })
      .catch((err) => {
        console.error("❌ Error fetching diet items:", err.message);
        setError("Could not fetch diet items. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [goal, normalizedGoal]);

  const categorizeItems = (mealType) =>
    items.filter((item) => item.mealType?.toLowerCase() === mealType);

  const totalCalories = items.reduce((sum, item) => sum + (item.calories || 0), 0);

  return (
    <div className="diet-details-page">
      <Navbar />
      
      <div className="diet-details-hero">
        <div className="hero-overlay">
          <button className="back-btn" onClick={() => navigate('/diet/plans')}>
            ← Back to Plans
          </button>
          <h1>{goal?.replace(/-/g, " ").toUpperCase()}</h1>
          <p>Complete meal plan with calorie breakdown</p>
        </div>
      </div>

      <div className="diet-details-container">
        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading meal plan...</p>
          </div>
        )}
        
        {error && (
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
          </div>
        )}
        
        {!loading && !error && items.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🍽️</div>
            <h3>No meal items found</h3>
            <p>This diet plan doesn't have any items yet.</p>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <>
            {/* Summary Card */}
            <div className="summary-card">
              <div className="summary-item">
                <span className="summary-icon">🔥</span>
                <div>
                  <h3>{totalCalories}</h3>
                  <p>Total Calories</p>
                </div>
              </div>
              <div className="summary-item">
                <span className="summary-icon">🍽️</span>
                <div>
                  <h3>{items.length}</h3>
                  <p>Food Items</p>
                </div>
              </div>
              <div className="summary-item">
                <span className="summary-icon">📊</span>
                <div>
                  <h3>{Math.round(totalCalories / 4)}</h3>
                  <p>Avg per Meal</p>
                </div>
              </div>
            </div>

            {/* Meal Sections */}
            <div className="meals-container">
              {["breakfast", "lunch", "dinner", "snack"].map((meal) => {
                const mealItems = categorizeItems(meal);
                const mealCalories = mealItems.reduce((sum, item) => sum + (item.calories || 0), 0);
                
                return (
                  mealItems.length > 0 && (
                    <div key={meal} className="meal-section">
                      <div className="meal-header">
                        <h3>
                          <span className="meal-icon">{mealIcons[meal]}</span>
                          {meal.charAt(0).toUpperCase() + meal.slice(1)}
                        </h3>
                        <span className="meal-calories">{mealCalories} cal</span>
                      </div>
                      <div className="meal-items-grid">
                        {mealItems.map((item) => (
                          <div key={item._id} className="meal-item-card">
                            <div className="item-info">
                              <h4>{item.name}</h4>
                              <p>{item.quantity || "1 serving"}</p>
                            </div>
                            <div className="item-calories">
                              <span className="calorie-value">{item.calories}</span>
                              <span className="calorie-label">cal</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DietDetails;
