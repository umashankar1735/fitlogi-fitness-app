import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./DietHome.css";

export default function DietHome() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      setUserProfile(JSON.parse(profile));
    }
  }, []);

  const cards = [
    { 
      title: "Diet Plans", 
      route: "/diet/plans", 
      icon: "🥗",
      description: "Personalized meal plans for your goals",
      color: "#4ecdc4"
    },
    { 
      title: "BMI Calculator", 
      route: "/bmi", 
      icon: "⚖️",
      description: "Calculate your Body Mass Index",
      color: "#ff6b6b"
    },
    { 
      title: "Calorie Tracker", 
      route: "/calorie-details", 
      icon: "🔥",
      description: "Track your daily calorie intake",
      color: "#95e1d3"
    },
    { 
      title: "Nutrition Tips", 
      route: "/tips", 
      icon: "💡",
      description: "Expert nutrition advice",
      color: "#f38181"
    },
  ];

  const [quickStats, setQuickStats] = useState([
    { label: "Today's Calories", value: "0", icon: "🔥", color: "#ff6b6b" },
    { label: "Exercises Today", value: "0", icon: "🏋️", color: "#4ecdc4" },
    { label: "Active Days", value: "0", icon: "📅", color: "#95e1d3" },
  ]);

  useEffect(() => {
    // Fetch real-time exercise data
    const fetchStats = async () => {
      try {
        const userId = "user123";
        const res = await fetch(`http://localhost:5001/api/exercises/user/${userId}`);
        const exercises = await res.json();
        
        // Calculate today's stats
        const today = new Date().toDateString();
        const todayExercises = exercises.filter(ex => 
          new Date(ex.date).toDateString() === today
        );
        
        const totalCalories = todayExercises.reduce((sum, ex) => 
          sum + (parseInt(ex.calories) || 0), 0
        );
        
        // Get unique active days
        const uniqueDays = new Set(
          exercises.map(ex => new Date(ex.date).toDateString())
        );
        
        setQuickStats([
          { label: "Today's Calories", value: totalCalories.toString(), icon: "🔥", color: "#ff6b6b" },
          { label: "Exercises Today", value: todayExercises.length.toString(), icon: "🏋️", color: "#4ecdc4" },
          { label: "Active Days", value: uniqueDays.size.toString(), icon: "📅", color: "#95e1d3" },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="diet-page">
      <Navbar />
      
      {/* Hero Section */}
      <div className="diet-hero">
        <div className="hero-overlay">
          <h1>🍎 Nutrition Hub</h1>
          <p>Fuel your body, achieve your goals</p>
          {userProfile && (
            <div className="user-greeting">
              Welcome back, <strong>{userProfile.name}!</strong> Let's track your nutrition today.
            </div>
          )}
        </div>
      </div>

      <div className="diet-container">
        {/* Quick Stats */}
        <div className="quick-stats">
          {quickStats.map((stat, index) => (
            <div key={index} className="quick-stat-card" style={{ '--accent-color': stat.color }}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Features Section */}
        <div className="features-section">
          <h2 className="section-title">Nutrition Tools</h2>
          <p className="section-subtitle">Everything you need for healthy eating</p>
          
          <div className="diet-grid">
            {cards.map((card, index) => (
              <div
                key={card.title}
                className="diet-card"
                onClick={() => navigate(card.route)}
                style={{ '--card-color': card.color, animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-icon" style={{ background: card.color }}>
                  {card.icon}
                </div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
                <button className="card-btn">Explore →</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
