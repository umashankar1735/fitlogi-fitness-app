import React, { useState } from "react";

const LogWorkoutForm = ({ userId, onWorkoutLogged }) => {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    workoutName: "",
    exercises: "",
    notes: "",
    durationMinutes: "",
    caloriesBurned: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5001/api/progress/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to log workout");
      setSuccess("Workout logged!");
      setForm({
        date: new Date().toISOString().slice(0, 10),
        workoutName: "",
        exercises: "",
        notes: "",
        durationMinutes: "",
        caloriesBurned: "",
      });
      if (onWorkoutLogged) onWorkoutLogged();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <h3>Log Workout</h3>
      <input type="date" name="date" value={form.date} onChange={handleChange} required />
      <input type="text" name="workoutName" placeholder="Workout Name" value={form.workoutName} onChange={handleChange} required />
      <input type="text" name="exercises" placeholder="Exercises (comma separated)" value={form.exercises} onChange={handleChange} required />
      <input type="text" name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />
      <input type="number" name="durationMinutes" placeholder="Duration (min)" value={form.durationMinutes} onChange={handleChange} required />
      <input type="number" name="caloriesBurned" placeholder="Calories Burned" value={form.caloriesBurned} onChange={handleChange} required />
      <button type="submit" disabled={loading}>{loading ? "Logging..." : "Log Workout"}</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}
    </form>
  );
};

export default LogWorkoutForm;
