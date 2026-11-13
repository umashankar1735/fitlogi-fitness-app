import React, { useState, useEffect } from "react";
import "./ProgressTracker.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressTracker = ({ goal }) => {
  const [currentWeight, setCurrentWeight] = useState("");
  const [progressData, setProgressData] = useState(
    goal?.currentProgress || []
  );

  const handleAddProgress = () => {
    if (!currentWeight) return;
    const newEntry = {
      date: new Date().toLocaleDateString("en-GB"),
      weight: Number(currentWeight),
    };
    const updatedData = [...progressData, newEntry];
    setProgressData(updatedData);
    const updatedGoal = { ...goal, currentProgress: updatedData };
    localStorage.setItem("fitnessGoal", JSON.stringify(updatedGoal));
    setCurrentWeight("");
  };

  const getLastWeight = () => {
    if (progressData.length === 0) return goal?.currentWeight || 0;
    return progressData[progressData.length - 1].weight;
  };

  const progressPercent = Math.min(
    ((getLastWeight() - goal.currentWeight) /
      (goal.targetWeight - goal.currentWeight)) *
      100,
    100
  );

  return (
    <div className="progress-container">
      <h2>📊 Track Your Progress</h2>

      <div className="tracker-flex">
        <div style={{ width: 150 }}>
          <CircularProgressbar
            value={progressPercent}
            text={`${Math.round(progressPercent)}%`}
            styles={buildStyles({
              pathColor: "#00c853",
              textColor: "#333",
              trailColor: "#e0e0e0",
              textSize: "18px",
            })}
          />
        </div>

        <div className="tracker-input">
          <input
            type="number"
            placeholder="Enter current weight"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
          />
          <button onClick={handleAddProgress}>+ Add</button>
        </div>
      </div>

      <div className="progress-logs">
        <h4>📅 Check-ins</h4>
        {progressData
          .slice()
          .reverse()
          .map((entry, idx) => (
            <div key={idx} className="log-entry">
              {entry.date} — <strong>{entry.weight} kg</strong>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
