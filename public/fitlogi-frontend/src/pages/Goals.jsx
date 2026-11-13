import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Goals.css";

function Goals() {
  const [showModal, setShowModal] = useState(false);
  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    target: "",
    unit: "",
    category: "Weight Loss/Gain",
    deadline: "",
  });

  useEffect(() => {
    // 🔁 Fetch existing goals from backend
    axios.get("http://localhost:5001/api/goals")
      .then((res) => setGoals(res.data))
      .catch((err) => console.error("Failed to load goals:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios.post("http://localhost:5001/api/goals", formData)
      .then((res) => {
        setGoals([...goals, res.data]);
        setFormData({
          title: "",
          description: "",
          target: "",
          unit: "",
          category: "Weight Loss/Gain",
          deadline: "",
        });
        setShowModal(false);
      })
      .catch((err) => {
        console.error("Error saving goal:", err);
      });
  };

  return (
    <div className="goals-page">
      <div className="goals-header">
        <h2>🎯 Goals</h2>
        <p>Set and track your fitness objectives!</p>
        <button className="new-goal-btn" onClick={() => setShowModal(true)}>
          + New Goal
        </button>
      </div>

      <div className="active-goals">
        <h3>Active Goals ({goals.length})</h3>
        {goals.length === 0 ? (
          <p>No goals added yet.</p>
        ) : (
          goals.map((goal, idx) => (
            <div key={idx} className="goal-item">
              <h4>{goal.title}</h4>
              <p>{goal.description}</p>
              <p>
                Target: {goal.target} {goal.unit}
              </p>
              <p>Category: {goal.category}</p>
              <p>Deadline: {goal.deadline}</p>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create New Goal</h2>

            <input
              type="text"
              name="title"
              placeholder="e.g., Lose 10kg, Bench press 100kg"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Describe your goal in detail"
              value={formData.description}
              onChange={handleChange}
            ></textarea>

            <div className="row">
              <input
                type="number"
                name="target"
                placeholder="100"
                value={formData.target}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="unit"
                placeholder="kg, lbs, km, etc."
                value={formData.unit}
                onChange={handleChange}
              />
            </div>

            <select name="category" value={formData.category} onChange={handleChange}>
              <option>Weight Loss/Gain</option>
              <option>Muscle Gain</option>
              <option>Endurance</option>
              <option>Flexibility</option>
              <option>Habit Formation</option>
            </select>

            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
            />

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="create-btn" onClick={handleSubmit}>
                Create Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Goals;
