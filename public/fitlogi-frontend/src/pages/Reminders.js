import React, { useState, useEffect } from "react";
import "./Reminders.css";

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [days, setDays] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [toastMsg, setToastMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    const savedReminders = JSON.parse(localStorage.getItem("reminders")) || [];
    setReminders(savedReminders);
  }, []);

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  const showToast = (message) => {
    setToastMsg(message);
    setTimeout(() => setToastMsg(""), 2000);
  };

  const toggleDay = (day) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !time || days.length === 0) {
      alert("Please fill all fields");
      return;
    }

    const newReminder = { title, time, days };

    let updatedReminders;
    if (editIndex !== null) {
      updatedReminders = [...reminders];
      updatedReminders[editIndex] = newReminder;
      setEditIndex(null);
      showToast("Reminder Updated ✅");
    } else {
      updatedReminders = [...reminders, newReminder];
      showToast("New Reminder Added ✅");
    }

    setReminders(updatedReminders);
    setTitle("");
    setTime("");
    setDays([]);
    setIsModalOpen(false);
  };

  const editReminder = (index) => {
    const r = reminders[index];
    setTitle(r.title);
    setTime(r.time);
    setDays(r.days);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const deleteReminder = (index) => {
    const updatedReminders = reminders.filter((_, i) => i !== index);
    setReminders(updatedReminders);
    showToast("Reminder Deleted ❌");
  };

  const addQuickReminder = (title, time, days) => {
    const updatedReminders = [...reminders, { title, time, days }];
    setReminders(updatedReminders);
    showToast("Quick Reminder Added ✅");
  };

  return (
    <div className="reminders-container">
      <h1>Workout Reminders</h1>
      <p className="subtitle">Stay consistent with your fitness schedule</p>

      <button className="open-modal-btn" onClick={() => setIsModalOpen(true)}>
        ➕ Add Reminder
      </button>

      {/* ✅ Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editIndex !== null ? "Edit Reminder" : "New Reminder"}</h2>
            <form className="reminder-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Reminder Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <div className="days-container">
                {daysList.map((day) => (
                  <button
                    key={day}
                    type="button"
                    className={days.includes(day) ? "active" : ""}
                    onClick={() => toggleDay(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <div className="modal-actions">
                <button type="submit" className="submit-btn">
                  {editIndex !== null ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setIsModalOpen(false);
                    setTitle("");
                    setTime("");
                    setDays([]);
                    setEditIndex(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Your Reminders */}
      <div className="reminders-box">
        <h2>Your Reminders</h2>
        {reminders.length === 0 ? (
          <div className="empty-state">
            <p>No reminders yet</p>
          </div>
        ) : (
          <div className="reminder-cards">
            {reminders.map((r, i) => (
              <div className="reminder-card" key={i}>
                <div>
                  <h4>{r.title}</h4>
                  <p>
                    ⏰ {r.time} <br />
                    📅 {r.days.join(", ")}
                  </p>
                </div>
                <div className="card-actions">
                  <button
                    className="icon-btn"
                    onClick={() => editReminder(i)}
                    title="Edit"
                  >
                    ✏
                  </button>
                  <button
                    className="icon-btn delete"
                    onClick={() => deleteReminder(i)}
                    title="Delete"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Quick Setup */}
      <div className="quick-setup">
        <h3>Quick Setup</h3>
        <div className="quick-cards">
          <div
            className="card"
            onClick={() =>
              addQuickReminder("Morning Routine", "07:00", ["Mon", "Wed", "Fri"])
            }
          >
            Morning Routine <br />
            <span>7:00 AM • Mon, Wed, Fri</span>
          </div>
          <div
            className="card"
            onClick={() =>
              addQuickReminder("Evening Session", "18:00", ["Tue", "Thu", "Sat"])
            }
          >
            Evening Session <br />
            <span>6:00 PM • Tue, Thu, Sat</span>
          </div>
          <div
            className="card"
            onClick={() =>
              addQuickReminder("Daily Activity", "12:00", [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun",
              ])
            }
          >
            Daily Activity <br />
            <span>12:00 PM • Every day</span>
          </div>
        </div>
      </div>

      {/* ✅ Toast Notification */}
      {toastMsg && <div className="toast">{toastMsg}</div>}
    </div>
  );
};

export default Reminders;
