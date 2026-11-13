import React, { useEffect, useState } from "react";
import "./WorkoutHistory.css";

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("workouts")) || [];
    const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    setWorkouts(sorted);
  }, []);

  const handleDelete = (index) => {
    if (window.confirm("Delete this workout?")) {
      const newData = workouts.filter((_, i) => i !== index);
      setWorkouts(newData);
      localStorage.setItem("workouts", JSON.stringify(newData));
      setSelected(null);
    }
  };

  return (
    <div className="wh-container">
      <h2>📊 Workout History</h2>
      <div className="wh-list">
        {workouts.length === 0 ? (
          <p className="wh-empty">No workouts found.</p>
        ) : (
          workouts.map((w, i) => (
            <div key={i} className="wh-card" onClick={() => setSelected(w)}>
              <div className="wh-card-left">
                <h3>{w.title}</h3>
                <p>{w.date}</p>
              </div>
              <div className="wh-icons">
                <button onClick={(e) => { e.stopPropagation(); handleDelete(i); }}>🗑️</button>
                {/* You can later add Edit here: ✏️ */}
              </div>
            </div>
          ))
        )}
      </div>

      {selected && (
        <div className="wh-modal">
          <div className="wh-modal-content">
            <span className="close" onClick={() => setSelected(null)}>❌</span>
            <h3>{selected.title}</h3>
            <p><strong>🗓️ Date:</strong> {selected.date}</p>
            <p><strong>⏱️ Duration:</strong> {selected.duration} mins</p>
            <p><strong>🔥 Exercises:</strong></p>
            <ul>
              {selected.exercises?.length ? (
                selected.exercises.map((ex, idx) => <li key={idx}>{ex}</li>)
              ) : (
                <li style={{ color: "#888" }}>No exercises listed</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutHistory;
