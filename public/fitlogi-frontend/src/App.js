import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Exercise from "./pages/Exercise";
import DietHome from "./pages/DietHome";
import DietPlans from "./pages/DietPlans";
import DietDetails from "./pages/DietDetails";
import BMICalculator from "./pages/BMICalculator";
import Progress from "./pages/Progress";
import CalorieDetails from "./pages/CalorieDetails";
import Tips from "./pages/Tips";
import Goals from "./pages/Goals";
import Plans from "./pages/Plans";
import Reminders from "./pages/Reminders";
import WorkoutHistory from "./pages/WorkoutHistory"; // ✅ Added
import Login from "./pages/Login";

// ✅ WorkoutPlans Component (inline)
function WorkoutPlans() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/plans")
      .then((res) => {
        setPlans(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch plans:", err.message);
        setError("Failed to load workout plans 🥲");
      });
  }, []);

  const filteredPlans =
    filter === "All" ? plans : plans.filter((p) => p.category === filter);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>Workout Plans</h1>
        <p>Structured programs to achieve your fitness goals</p>
      </header>

      {/* Filter Buttons */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {["All", "Strength", "Cardio", "Flexibility"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              margin: "5px",
              padding: "10px 20px",
              backgroundColor: filter === cat ? "#007bff" : "#f0f0f0",
              color: filter === cat ? "#fff" : "#000",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Layout */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Plan List */}
        <div style={{ width: "60%" }}>
          <h3>Available Plans ({filteredPlans.length})</h3>
          {error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            filteredPlans.map((plan) => (
              <div
                key={plan._id}
                style={{
                  border: "1px solid #ddd",
                  padding: "15px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedPlan(plan)}
              >
                <h4>{plan.name}</h4>
                <p>{plan.description}</p>
                <p>
                  <strong>Duration:</strong> {plan.duration} weeks |{" "}
                  <strong>Frequency:</strong> {plan.frequency} times/week
                </p>
                <p>⭐ {plan.rating}</p>
              </div>
            ))
          )}
        </div>

        {/* Plan Details */}
        <div
          style={{
            width: "35%",
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          {selectedPlan ? (
            <>
              <h3>{selectedPlan.name}</h3>
              <p>{selectedPlan.description}</p>
              <p>
                <strong>Category:</strong> {selectedPlan.category}
              </p>
              <p>
                <strong>Duration:</strong> {selectedPlan.duration} weeks
              </p>
              <p>
                <strong>Frequency:</strong> {selectedPlan.frequency} times/week
              </p>
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Start Plan
              </button>
            </>
          ) : (
            <p>Select a plan to view details</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ✅ App Component (Main Router)
function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise" element={<Exercise />} />
          <Route path="/diet" element={<DietHome />} />
          <Route path="/diet/plans" element={<DietPlans />} />
          <Route path="/diet/:goal" element={<DietDetails />} />
          <Route path="/bmi" element={<BMICalculator />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/calorie-details" element={<CalorieDetails />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/history" element={<WorkoutHistory />} /> {/* ✅ Added */}
          <Route path="/workout-plans" element={<WorkoutPlans />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <div>
                <h2>Page Not Found 😢</h2>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
