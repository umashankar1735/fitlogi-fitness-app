import React, { useState } from "react";

function ExerciseForm({ userId, onExerciseAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    calories: "",
    imageUrl: "",
  });

  const handleAddExercise = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5001/api/exercises/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, userId }),
    });

    const data = await response.json();
    alert(data.message);
    onExerciseAdded(); // refresh after add
  };

  return (
    <form onSubmit={handleAddExercise}>
      <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <input type="text" placeholder="Description" onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
      <input type="text" placeholder="Duration" onChange={(e) => setFormData({ ...formData, duration: e.target.value })} />
      <input type="number" placeholder="Calories" onChange={(e) => setFormData({ ...formData, calories: e.target.value })} />
      <input type="text" placeholder="Image URL" onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} />
      <button type="submit">Add Exercise</button>
    </form>
  );
}

export default ExerciseForm;
