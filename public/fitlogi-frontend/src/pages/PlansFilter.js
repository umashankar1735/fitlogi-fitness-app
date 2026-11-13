// src/components/PlansFilter.js
import React from "react";
import "../styles/Plans.css";

const PlansFilter = () => {
  return (
    <div className="plans-filter">
      <button className="active">📘 All Plans</button>
      <button>💪 Strength</button>
      <button>🏃‍♀️ Cardio</button>
      <button>🧘 Flexibility</button>
    </div>
  );
};

export default PlansFilter;
