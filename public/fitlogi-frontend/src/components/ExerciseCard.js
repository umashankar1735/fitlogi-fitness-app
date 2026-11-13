import React from "react";
import "../styles/goals.css";

const ExerciseCard = ({ exercise, onDelete }) => {
  return (
    <div className="exercise-card">
      <img
        src={exercise.imageUrl || "https://via.placeholder.com/150"}
        alt={exercise.name}
        className="exercise-image"
      />

      <div className="card-content">
        <h3>{exercise.name}</h3>
        {exercise.description && <p>{exercise.description}</p>}

        <div className="exercise-details">
          <span>🕒 {exercise.duration || "10 mins"}</span>
          <span>🔥 {exercise.calories} kcal</span>
        </div>

        <button className="delete-btn" onClick={() => onDelete(exercise._id)}>
          ❌ Remove
        </button>
      </div>
    </div>
  );
};

export default ExerciseCard;
