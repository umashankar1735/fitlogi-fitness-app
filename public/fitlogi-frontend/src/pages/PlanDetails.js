// src/components/PlanDetails.js
import React from "react";
import "../styles/Plans.css";

const PlanDetails = ({ selectedPlan }) => {
  return (
    <div className="plan-details">
      {selectedPlan ? (
        <>
          <h3>{selectedPlan.title}</h3>
          <p>{selectedPlan.description}</p>
          <p><strong>Duration:</strong> {selectedPlan.duration}</p>
          <p><strong>Frequency:</strong> {selectedPlan.frequency}</p>
          <p><strong>Level:</strong> {selectedPlan.level}</p>
          <p><strong>Rating:</strong> ⭐ {selectedPlan.rating}</p>
        </>
      ) : (
        <div className="plan-placeholder">
          <p>📖</p>
          <h4>Select a plan</h4>
          <p>Click on a workout plan to view details and exercises</p>
        </div>
      )}
    </div>
  );
};

export default PlanDetails;
