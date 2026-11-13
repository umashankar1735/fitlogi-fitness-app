import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./DietPlans.css";
import { useNavigate } from "react-router-dom";

const DietPlans = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCardClick = (planTitle) => {
    const formattedTitle = planTitle.toLowerCase().replace(/ /g, "-");
    navigate(`/diet/${formattedTitle}`);
  };

  const plans = [
    {
      period: "4 weeks",
      title: "Weight Loose Diet Plan",
      category: "Weight Loss",
      calories: "1200-1500 cal/day",
      difficulty: "Medium",
      icon: "🥗",
      color: "#ff6b6b"
    },
    {
      period: "7 Days",
      title: "GM Diet Plan",
      category: "Weight Loss",
      calories: "800-1000 cal/day",
      difficulty: "Hard",
      icon: "🍎",
      color: "#4ecdc4"
    },
    {
      period: "3 Days",
      title: "Strict Diet Plan",
      category: "Weight Loss",
      calories: "600-900 cal/day",
      difficulty: "Very Hard",
      icon: "⚡",
      color: "#f38181"
    },
    {
      period: "4 weeks",
      title: "Weight Gain Diet Plan",
      category: "Weight Gain",
      calories: "2500-3000 cal/day",
      difficulty: "Medium",
      icon: "💪",
      color: "#95e1d3"
    },
    {
      period: "7 Days",
      title: "Night Diet Plan",
      category: "Maintenance",
      calories: "1800-2000 cal/day",
      difficulty: "Easy",
      icon: "🌙",
      color: "#a8e6cf"
    },
    {
      period: "3 Days",
      title: "Fitness Diet Plan",
      category: "Fitness",
      calories: "2000-2200 cal/day",
      difficulty: "Medium",
      icon: "🏋️",
      color: "#ffd3b6"
    },
  ];

  const categories = ["All", "Weight Loss", "Weight Gain", "Maintenance", "Fitness"];
  
  const filteredPlans = selectedCategory === "All" 
    ? plans 
    : plans.filter(plan => plan.category === selectedCategory);

  return (
    <div className="dietplans-page">
      <Navbar />
      
      <div className="dietplans-hero">
        <div className="hero-overlay">
          <h1>🍽️ Diet Plans</h1>
          <p>Choose a personalized diet plan for your goals</p>
        </div>
      </div>

      <div className="dietplans-container">
        {/* Filter Section */}
        <div className="filter-section">
          <h3>Filter by Category</h3>
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="dietplans-grid">
          {filteredPlans.map((plan, idx) => (
            <div
              key={idx}
              className="dietplans-card"
              onClick={() => handleCardClick(plan.title)}
              style={{ '--card-color': plan.color }}
            >
              <div className="card-header">
                <div className="plan-icon" style={{ background: plan.color }}>
                  {plan.icon}
                </div>
                <span className="difficulty-badge" style={{ background: plan.color }}>
                  {plan.difficulty}
                </span>
              </div>
              
              <h3 className="plan-title">{plan.title}</h3>
              
              <div className="plan-details">
                <div className="detail-row">
                  <span className="detail-label">⏱️ Duration:</span>
                  <span className="detail-value">{plan.period}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">🔥 Calories:</span>
                  <span className="detail-value">{plan.calories}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">📁 Category:</span>
                  <span className="detail-value">{plan.category}</span>
                </div>
              </div>
              
              <button className="view-plan-btn">
                View Plan Details →
              </button>
            </div>
          ))}
        </div>

        {filteredPlans.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🍽️</div>
            <h3>No plans found</h3>
            <p>Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DietPlans;
