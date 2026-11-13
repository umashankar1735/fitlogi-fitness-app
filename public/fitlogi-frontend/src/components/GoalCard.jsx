import React from "react";
import "./GoalCard.css";
import { FaTrashAlt } from "react-icons/fa";

function GoalCard({ goal, onDelete }) {
  const percentage = ((goal.current / goal.target) * 100).toFixed(0);
  const formattedDate = new Date(goal.deadline).toLocaleDateString("en-GB");

  return (
    <div className="goal-card">
      <div className="goal-header">
        <h3>{goal.title}</h3>
        <FaTrashAlt onClick={onDelete} />
      </div>
      <p>{goal.description}</p>
      <div className="progress-bar">
        <div className="fill" style={{ width: `${percentage}%` }}></div>
      </div>
      <p>
        Progress: {goal.current} / {goal.target} {goal.unit}
      </p>
      <small>Category: {goal.category} | Deadline: {formattedDate}</small>
    </div>
  );
}

export default GoalCard;
