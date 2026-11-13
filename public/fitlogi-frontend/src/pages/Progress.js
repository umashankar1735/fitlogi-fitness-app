import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from "recharts";
import "./Progress.css";

const Progress = () => {
  const [progressData, setProgressData] = useState([]);
  const [workoutLogs, setWorkoutLogs] = useState([]);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalMinutes: 0,
    totalCalories: 0,
    avgDuration: 0,
    currentStreak: 0,
    bestStreak: 0
  });
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    workoutName: "",
    exercises: "",
    durationMinutes: "",
    caloriesBurned: "",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const userId = localStorage.getItem("userId") || "demoUser";

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/progress/progress/${userId}`);
      const data = await res.json();
      
      if (data.workouts && Array.isArray(data.workouts)) {
        setWorkoutLogs(data.workouts);
        processProgressData(data.workouts);
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  };

  const processProgressData = (workouts) => {
    if (!workouts.length) return;

    // Calculate stats
    const totalWorkouts = workouts.length;
    const totalMinutes = workouts.reduce((sum, w) => sum + (parseInt(w.durationMinutes) || 0), 0);
    const totalCalories = workouts.reduce((sum, w) => sum + (parseInt(w.caloriesBurned) || 0), 0);
    const avgDuration = Math.round(totalMinutes / totalWorkouts);

    // Calculate streaks
    const sortedDates = workouts
      .map(w => new Date(w.date).toDateString())
      .sort((a, b) => new Date(a) - new Date(b));
    const uniqueDates = [...new Set(sortedDates)];
    
    let currentStreak = 0;
    let bestStreak = 0;
    let tempStreak = 1;
    
    for (let i = 0; i < uniqueDates.length; i++) {
      if (i > 0) {
        const prevDate = new Date(uniqueDates[i - 1]);
        const currDate = new Date(uniqueDates[i]);
        const diffDays = Math.round((currDate - prevDate) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          tempStreak++;
        } else {
          bestStreak = Math.max(bestStreak, tempStreak);
          tempStreak = 1;
        }
      }
    }
    bestStreak = Math.max(bestStreak, tempStreak);
    
    // Check if today is part of streak
    const today = new Date().toDateString();
    const lastWorkout = new Date(uniqueDates[uniqueDates.length - 1]);
    const diffFromToday = Math.round((new Date(today) - lastWorkout) / (1000 * 60 * 60 * 24));
    currentStreak = diffFromToday <= 1 ? tempStreak : 0;

    setStats({
      totalWorkouts,
      totalMinutes,
      totalCalories,
      avgDuration,
      currentStreak,
      bestStreak
    });

    // Prepare chart data (last 7 days)
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toDateString();
      
      const dayWorkouts = workouts.filter(w => new Date(w.date).toDateString() === dateStr);
      const dayMinutes = dayWorkouts.reduce((sum, w) => sum + (parseInt(w.durationMinutes) || 0), 0);
      const dayCalories = dayWorkouts.reduce((sum, w) => sum + (parseInt(w.caloriesBurned) || 0), 0);
      
      last7Days.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        minutes: dayMinutes,
        calories: dayCalories,
        workouts: dayWorkouts.length
      });
    }
    
    setProgressData(last7Days);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    
    try {
      const res = await fetch("http://localhost:5001/api/progress/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userId }),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || "Failed to log workout");
      
      setMessage({ type: "success", text: "Workout logged successfully! 💪" });
      setForm({
        date: new Date().toISOString().slice(0, 10),
        workoutName: "",
        exercises: "",
        durationMinutes: "",
        caloriesBurned: "",
        notes: ""
      });
      setShowForm(false);
      
      // Refresh data
      setTimeout(() => {
        fetchProgressData();
        setMessage({ type: "", text: "" });
      }, 1500);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWorkout = async (workoutId) => {
    if (!window.confirm("Are you sure you want to delete this workout?")) return;
    
    try {
      const res = await fetch(`http://localhost:5001/api/progress/log/${workoutId}`, {
        method: "DELETE"
      });
      
      if (!res.ok) throw new Error("Failed to delete workout");
      
      setMessage({ type: "success", text: "Workout deleted!" });
      fetchProgressData();
      
      setTimeout(() => setMessage({ type: "", text: "" }), 2000);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <>
      <Navbar />
      <div className="progress-page">
        <div className="progress-hero">
          <div className="hero-overlay">
            <h1>📈 Progress Tracker</h1>
            <p>Track your fitness journey and celebrate your achievements</p>
          </div>
        </div>

        <div className="progress-content">
          {/* Stats Dashboard */}
          <div className="stats-dashboard">
            <div className="stat-card">
              <div className="stat-icon">🏋️</div>
              <div className="stat-info">
                <span className="stat-value">{stats.totalWorkouts}</span>
                <span className="stat-label">Total Workouts</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-info">
                <span className="stat-value">{stats.totalMinutes}</span>
                <span className="stat-label">Total Minutes</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <div className="stat-info">
                <span className="stat-value">{stats.totalCalories}</span>
                <span className="stat-label">Total Calories</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <span className="stat-value">{stats.avgDuration}</span>
                <span className="stat-label">Avg Duration (min)</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <div className="stat-info">
                <span className="stat-value">{stats.currentStreak}</span>
                <span className="stat-label">Current Streak</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-info">
                <span className="stat-value">{stats.bestStreak}</span>
                <span className="stat-label">Best Streak</span>
              </div>
            </div>
          </div>

          {/* Message */}
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          {/* Add Workout Button */}
          <div className="action-bar">
            <button className="add-workout-btn" onClick={() => setShowForm(!showForm)}>
              {showForm ? "✕ Cancel" : "+ Log New Workout"}
            </button>
          </div>

          {/* Log Workout Form */}
          {showForm && (
            <div className="workout-form-section">
              <h3>Log Your Workout</h3>
              <form onSubmit={handleSubmit} className="workout-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Workout Name</label>
                    <input
                      type="text"
                      name="workoutName"
                      placeholder="e.g., Morning Run"
                      value={form.workoutName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Duration (minutes)</label>
                    <input
                      type="number"
                      name="durationMinutes"
                      placeholder="30"
                      value={form.durationMinutes}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Calories Burned</label>
                    <input
                      type="number"
                      name="caloriesBurned"
                      placeholder="250"
                      value={form.caloriesBurned}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group full-width">
                  <label>Exercises</label>
                  <input
                    type="text"
                    name="exercises"
                    placeholder="e.g., Squats, Push-ups, Planks"
                    value={form.exercises}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label>Notes (optional)</label>
                  <textarea
                    name="notes"
                    placeholder="How did you feel? Any achievements?"
                    value={form.notes}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Logging..." : "Log Workout"}
                </button>
              </form>
            </div>
          )}

          {/* Charts Section */}
          {progressData.length > 0 && (
            <div className="charts-section">
              <div className="chart-card">
                <h3>Weekly Workout Duration</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" stroke="#718096" />
                    <YAxis stroke="#718096" />
                    <Tooltip 
                      contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                    />
                    <Bar dataKey="minutes" fill="#667eea" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <h3>Weekly Calories Burned</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" stroke="#718096" />
                    <YAxis stroke="#718096" />
                    <Tooltip 
                      contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="calories" stroke="#f56565" strokeWidth={3} dot={{ fill: '#f56565', r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Recent Workouts */}
          {workoutLogs.length > 0 && (
            <div className="recent-workouts-section">
              <h3>Recent Workouts</h3>
              <div className="workouts-list">
                {workoutLogs.slice(0, 10).map((workout) => (
                  <div key={workout._id} className="workout-item">
                    <div className="workout-header">
                      <div className="workout-title-section">
                        <h4>{workout.workoutName}</h4>
                        <span className="workout-date">
                          {new Date(workout.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                      <button 
                        className="delete-workout-btn"
                        onClick={() => handleDeleteWorkout(workout._id)}
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="workout-details">
                      <span className="workout-stat">
                        <strong>⏱️ {workout.durationMinutes} min</strong>
                      </span>
                      <span className="workout-stat">
                        <strong>🔥 {workout.caloriesBurned} cal</strong>
                      </span>
                    </div>
                    <p className="workout-exercises">Exercises: {workout.exercises}</p>
                    {workout.notes && <p className="workout-notes">Notes: {workout.notes}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {workoutLogs.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🏋️‍♀️</div>
              <h3>No Workouts Logged Yet</h3>
              <p>Start tracking your fitness journey by logging your first workout!</p>
              <button className="get-started-btn" onClick={() => setShowForm(true)}>
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Progress;
