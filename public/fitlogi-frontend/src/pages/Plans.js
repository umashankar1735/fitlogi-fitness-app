import React, { useEffect, useState } from "react";
import axios from "axios";

function Plans() {
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/workout-plans"); // make sure this matches your backend route
      setPlans(res.data);
    } catch (err) {
      console.error("❌ Error fetching plans:", err.message);
      alert("Failed to load workout plans. Is your backend running?");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/workout-plans/${id}`);
      setPlans(plans.filter((plan) => plan._id !== id));
      if (selectedPlanId === id) setSelectedPlanId(null);
    } catch (err) {
      console.error("❌ Error deleting plan:", err.message);
      alert("Failed to delete the workout plan.");
    }
  };

  const filteredPlans =
    filter === "All" ? plans : plans.filter((p) => p.category === filter);

  const selectedPlan = plans.find((p) => p._id === selectedPlanId);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>🏋️‍♀️ Workout Plans</h1>
        <p>Structured programs to achieve your fitness goals</p>
      </header>

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

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "60%" }}>
          <h3>Available Plans ({filteredPlans.length})</h3>
          {filteredPlans.length === 0 ? (
            <p>No plans available for this category.</p>
          ) : (
            filteredPlans.map((plan) => (
              <div
                key={plan._id}
                style={{
                  border: "1px solid #ddd",
                  padding: "15px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  backgroundColor:
                    selectedPlanId === plan._id ? "#e6f0ff" : "#fff",
                }}
              >
                <h4>{plan.title}</h4>
                <p>{plan.description}</p>
                <p>
                  <strong>Duration:</strong> {plan.duration} weeks |{" "}
                  <strong>Frequency:</strong> {plan.frequency}x/week
                </p>
                <p>
                  <strong>Level:</strong> {plan.level}
                </p>
                <p>
                  <strong>Category:</strong> {plan.category}
                </p>
                <p>⭐ {plan.rating}</p>
                <button
                  onClick={() => setSelectedPlanId(plan._id)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Start Plan
                </button>
                <button
                  onClick={() => handleDelete(plan._id)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  ❌ Delete
                </button>
              </div>
            ))
          )}
        </div>

        <div
          style={{
            width: "35%",
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          {selectedPlan ? (
            <>
              <h3>🚀 Selected Plan</h3>
              <h4>{selectedPlan.title}</h4>
              <p>{selectedPlan.description}</p>
              <p>
                <strong>Category:</strong> {selectedPlan.category}
              </p>
              <p>
                <strong>Level:</strong> {selectedPlan.level}
              </p>
              <p>
                <strong>Duration:</strong> {selectedPlan.duration} weeks
              </p>
              <p>
                <strong>Frequency:</strong> {selectedPlan.frequency}x/week
              </p>
              <p>⭐ {selectedPlan.rating}</p>
            </>
          ) : (
            <p>👉 Select a plan to view details here</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Plans;
