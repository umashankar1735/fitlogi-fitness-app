// src/components/PlanCard.js
import React from "react";
import "../styles/Plans.css";

const PlanCard = ({ plan, onClick }) => {
  return (
    <div className="plan-card" onClick={onClick}>
      <h4>{plan.title}</h4>
      <p>{plan.description}</p>
      <div className="plan-tags">
        <span className="tag">{plan.level}</span>
        <span>📅 {plan.duration}</span>
        <span>⏱ {plan.frequency}</span>
      </div>
      <div className="plan-footer">
        <span className="rating">⭐ {plan.rating}</span>
        <button className="start-btn">Start Plan</button>
      </div>
    </div>
  );
};

export default PlanCard;
