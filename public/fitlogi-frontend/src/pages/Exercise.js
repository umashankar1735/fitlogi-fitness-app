import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Exercise.css";

function Exercise() {
  const [exercises, setExercises] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    duration: "",
    calories: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const userId = "user123";

  const categories = ["All", "Cardio", "Strength", "Flexibility", "Sports", "Other"];

  const fetchExercises = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/exercises/user/${userId}`);
      setExercises(res.data);
    } catch (err) {
      console.error("Error fetching exercises:", err.message);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData, userId };

    try {
      if (editingId) {
        // ✏️ Update existing exercise
        await axios.put(`http://localhost:5001/api/exercises/${editingId}`, dataToSend);
        setEditingId(null);
      } else {
        // ➕ Add new exercise
        await axios.post("http://localhost:5001/api/exercises", dataToSend);
      }

      await fetchExercises();
      setFormData({
        name: "",
        category: "",
        duration: "",
        calories: "",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Operation failed. Check console.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/exercises/${id}`);
      await fetchExercises();
    } catch (err) {
      console.error("Delete failed:", err.message);
      alert("Failed to delete exercise.");
    }
  };

  const handleEdit = (exercise) => {
    setFormData({
      name: exercise.name,
      category: exercise.category,
      duration: exercise.duration,
      calories: exercise.calories,
      date: exercise.date.split("T")[0],
    });
    setEditingId(exercise._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      category: "",
      duration: "",
      calories: "",
      date: new Date().toISOString().split("T")[0],
    });
    setEditingId(null);
    setShowForm(false);
  };

  const filteredExercises = filterCategory === "All" 
    ? exercises 
    : exercises.filter(ex => ex.category === filterCategory);

  const totalStats = {
    exercises: exercises.length,
    duration: exercises.reduce((sum, ex) => sum + (parseInt(ex.duration) || 0), 0),
    calories: exercises.reduce((sum, ex) => sum + (parseInt(ex.calories) || 0), 0)
  };

  return (
    <div className="exercise-page">
      <Navbar />
      
      <div className="exercise-hero">
        <div className="hero-overlay">
          <h1>💪 Exercise Tracker</h1>
          <p>Track your workouts and reach your fitness goals</p>
        </div>
      </div>

      <div className="exercise-container">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🏋️</div>
            <div className="stat-info">
              <h3>{totalStats.exercises}</h3>
              <p>Total Exercises</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-info">
              <h3>{totalStats.duration}</h3>
              <p>Minutes Trained</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-info">
              <h3>{totalStats.calories}</h3>
              <p>Calories Burned</p>
            </div>
          </div>
        </div>

        {/* Add Exercise Button */}
        {!showForm && (
          <button className="add-exercise-btn" onClick={() => setShowForm(true)}>
            ➕ Log New Exercise
          </button>
        )}

        {/* Exercise Form */}
        {showForm && (
          <div className="exercise-form-card">
            <div className="form-header">
              <h2>{editingId ? "✏️ Edit Exercise" : "➕ Log New Exercise"}</h2>
              <button className="close-btn" onClick={handleCancel}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Exercise Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Running, Push-ups"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Strength">Strength</option>
                    <option value="Flexibility">Flexibility</option>
                    <option value="Sports">Sports</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Duration (minutes)</label>
                  <input
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="30"
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Calories Burned</label>
                  <input
                    name="calories"
                    type="number"
                    value={formData.calories}
                    onChange={handleChange}
                    placeholder="200"
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {editingId ? "Update Exercise" : "Add Exercise"}
                </button>
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter Bar */}
        <div className="filter-bar">
          <h3>📋 Your Workouts</h3>
          <div className="category-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
                onClick={() => setFilterCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Exercise List */}
        <div className="exercise-list">
          {filteredExercises.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🏃</div>
              <h3>No exercises logged yet</h3>
              <p>Start tracking your workouts to see your progress!</p>
            </div>
          ) : (
            <div className="exercise-grid">
              {filteredExercises.map(exercise => (
                <div key={exercise._id} className="exercise-card">
                  <div className="exercise-header">
                    <div className="exercise-category-badge">{exercise.category || "Other"}</div>
                    <div className="exercise-actions">
                      <button onClick={() => handleEdit(exercise)} title="Edit">✏️</button>
                      <button onClick={() => handleDelete(exercise._id)} title="Delete">🗑️</button>
                    </div>
                  </div>
                  <h4>{exercise.name}</h4>
                  <div className="exercise-details">
                    <div className="detail-item">
                      <span className="detail-icon">⏱️</span>
                      <span>{exercise.duration} min</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">🔥</span>
                      <span>{exercise.calories} cal</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📅</span>
                      <span>{new Date(exercise.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Exercise;
