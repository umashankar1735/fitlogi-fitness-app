import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./GoalModal.css"; // custom styles

const GoalModal = ({ isOpen, onClose, onSave, initialData = {} }) => {
  const [goalData, setGoalData] = useState({
    title: "",
    description: "",
    target: "",
    unit: "",
    category: "Weight Loss/Gain",
    deadline: new Date(),
  });

  useEffect(() => {
    if (initialData) {
      setGoalData({
        ...initialData,
        deadline: initialData.deadline ? new Date(initialData.deadline) : new Date(),
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setGoalData({ ...goalData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setGoalData({ ...goalData, deadline: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(goalData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="goal-modal-overlay">
      <div className="goal-modal">
        <h2>{initialData.title ? "Edit Goal" : "Add Goal"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Goal Title *</label>
          <input name="title" value={goalData.title} onChange={handleChange} required />

          <label>Description</label>
          <textarea name="description" value={goalData.description} onChange={handleChange} />

          <div className="goal-row">
            <div>
              <label>Target Value *</label>
              <input name="target" value={goalData.target} onChange={handleChange} required />
            </div>
            <div>
              <label>Unit</label>
              <input name="unit" value={goalData.unit} onChange={handleChange} />
            </div>
          </div>

          <label>Category</label>
          <select name="category" value={goalData.category} onChange={handleChange}>
            <option>Weight Loss/Gain</option>
            <option>Steps</option>
            <option>Water Intake</option>
            <option>Custom</option>
          </select>

          <label>Deadline *</label>
          <DatePicker selected={goalData.deadline} onChange={handleDateChange} dateFormat="dd-MM-yyyy" />

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="save-btn">
              {initialData.title ? "Update Goal" : "Add Goal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalModal;
