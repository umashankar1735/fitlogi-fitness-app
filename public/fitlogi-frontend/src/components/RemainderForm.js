import { useState } from "react";
import axios from "axios";

const ReminderForm = ({ userId, onAdd }) => {
  const [data, setData] = useState({ medicineName: "", date: "", time: "", note: "" });

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5001/api/reminders", { ...data, userId });
    onAdd(res.data); // Update UI
    setData({ medicineName: "", date: "", time: "", note: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="medicineName" value={data.medicineName} onChange={handleChange} placeholder="Medicine" />
      <input name="date" type="date" value={data.date} onChange={handleChange} />
      <input name="time" type="time" value={data.time} onChange={handleChange} />
      <input name="note" value={data.note} onChange={handleChange} placeholder="Note" />
      <button type="submit">Add Reminder</button>
    </form>
  );
};

export default ReminderForm;
