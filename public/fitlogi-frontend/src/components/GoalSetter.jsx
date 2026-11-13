import React, { useState } from "react";
import "./GoalSetter.css";

const GoalSetter = ({ onGoalSet }) => {
  const [goalType, setGoalType] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [stepGoal, setStepGoal] = useState("");
  const [workoutPlan, setWorkoutPlan] = useState("");
  const [dietPreference, setDietPreference] = useState("");
  const [motivation, setMotivation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const goalData = {
      goalType,
      currentWeight,
      targetWeight,
      duration,
      stepGoal,
      workoutPlan,
      dietPreference,
      motivation,
      currentProgress: [],
    };
    localStorage.setItem("fitnessGoal", JSON.stringify(goalData));
    onGoalSet(goalData);
  };

  const handleReset = () => {
    setGoalType("");
    setCurrentWeight("");
    setTargetWeight("");
    setDuration("");
    setStepGoal("");
    setWorkoutPlan("");
    setDietPreference("");
    setMotivation("");
  };

  return (
    <div className="goal-setter">
      <h2>🎯 Set Your Fitness Goal</h2>
      <form onSubmit={handleSubmit}>
        <label>Goal Type:</label>
        <select value={goalType} onChange={(e) => setGoalType(e.target.value)} required>
          <option value="">Choose</option>
          <option value="Weight Loss">Weight Loss</option>
          <option value="Muscle Gain">Muscle Gain</option>
          <option value="Fitness Maintenance">Fitness Maintenance</option>
        </select>

        <label>Current Weight (kg):</label>
        <input type="number" value={currentWeight} onChange={(e) => setCurrentWeight(e.target.value)} required />

        <label>Target Weight (kg):</label>
        <input type="number" value={targetWeight} onChange={(e) => setTargetWeight(e.target.value)} required />

        <label>Duration (weeks):</label>
        <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />

        <label>Daily Step Goal (optional):</label>
        <input type="number" value={stepGoal} onChange={(e) => setStepGoal(e.target.value)} />

        <label>Workout Plan:</label>
        <select value={workoutPlan} onChange={(e) => setWorkoutPlan(e.target.value)} required>
          <option value="">Select</option>
          <option value="Yoga">Yoga</option>
          <option value="Cardio">Cardio</option>
          <option value="Strength Training">Strength Training</option>
          <option value="Mixed Routine">Mixed Routine</option>
        </select>

        <label>Diet Preference:</label>
        <select value={dietPreference} onChange={(e) => setDietPreference(e.target.value)} required>
          <option value="">Select</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Keto">Keto</option>
        </select>

        <label>What motivates you? 💬</label>
        <textarea
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
          placeholder="e.g. I want to feel more confident in my body!"
        />

        <div className="goal-buttons">
          <button type="submit">🚀 Save Goal</button>
          <button type="button" className="reset-btn" onClick={handleReset}>🔁 Reset</button>
        </div>
      </form>

      {/* LIVE PREVIEW */}
      <div className="preview-card">
        <h3>📋 Goal Preview</h3>
        <p><strong>Goal:</strong> {goalType || "N/A"}</p>
        <p><strong>From:</strong> {currentWeight || "?"}kg → <strong>To:</strong> {targetWeight || "?"}kg</p>
        <p><strong>Duration:</strong> {duration} weeks</p>
        <p><strong>Steps/day:</strong> {stepGoal || "Not set"}</p>
        <p><strong>Workout:</strong> {workoutPlan || "N/A"}</p>
        <p><strong>Diet:</strong> {dietPreference || "N/A"}</p>
        <p><strong>Motivation:</strong> {motivation || "💭 Stay strong!"}</p>
      </div>
    </div>
  );
};

export default GoalSetter;
