// src/components/WorkoutFrequency.jsx
import React, { useEffect, useState } from "react";
import "./WorkoutFrequency.css";

const WorkoutFrequency = ({ refreshKey }) => {
  const [workoutData, setWorkoutData] = useState([]);

  // Fetch workout frequency from backend
  const fetchWorkoutData = async () => {
    try {
      // TODO: Replace with actual user id from context/auth
      const userId = localStorage.getItem("userId") || "demoUser";
      const res = await fetch(`http://localhost:5001/api/progress/progress/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch workout data");
      const data = await res.json();
      setWorkoutData(data);
    } catch (err) {
      setWorkoutData({ error: err.message });
    }
  };

  useEffect(() => {
    fetchWorkoutData();
    // eslint-disable-next-line
  }, [refreshKey]);

  return (
    <div className="workout-frequency">
      <h3>🏋️‍♀️ Workout Frequency (Last 30 Days)</h3>
      {workoutData?.error ? (
        <p style={{ color: 'red' }}>Error: {workoutData.error}</p>
      ) : (
        <>
          <p>
            You worked out <strong>{workoutData?.monthlyWorkoutDays ?? 0}</strong> times!
          </p>
          <ul>
            {/* Optionally, show weekly breakdown if available */}
            {workoutData?.weeklyData && Array.isArray(workoutData.weeklyData) ? (
              workoutData.weeklyData.map((count, idx) => (
                <li key={idx}>
                  {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][idx]}: {count} times
                </li>
              ))
            ) : (
              <li>No detailed workout data yet!</li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default WorkoutFrequency;
